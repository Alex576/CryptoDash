import { HttpService } from '@nestjs/axios';
import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { AxiosError, AxiosRequestConfig } from 'axios';
import { catchError, firstValueFrom, map } from 'rxjs';
import { In, Repository } from 'typeorm';
import { Subject } from '../crypto-engine/entities/subject';
import { SubjectData } from '../crypto-engine/entities/subject-data';
import { CoinDataEntity } from './coingecko-entities/coin-data-entity';
import { CoinListEntity } from './coingecko-entities/coin-list-entity';
import { SubjectHistory } from './entities/subject-history';
import { SupportedVsCurrency } from './entities/supported-vs-currencies';

@Injectable()
export class DataMigratorService implements OnApplicationBootstrap {
  private readonly BASE_URL = 'https://api.coingecko.com/api/v3';
  private readonly COINS_URL = `${this.BASE_URL}/coins`;
  private readonly COIN_LIST_URL = `${this.COINS_URL}/list`;
  private readonly GET_COIN_DATA_BY_ID = (id: string) => `${this.COINS_URL}/${id}`;
  private readonly SIMPLE = `${this.BASE_URL}/simple`;
  private readonly GET_PRICE = `${this.SIMPLE}/price`;

  private readonly GET_SUPPORTED_VS_CURRENCY_LIST = `${this.SIMPLE}/supported_vs_currencies`;

  private readonly logger = new Logger(DataMigratorService.name);

  constructor(
    private readonly httpService: HttpService,
    @InjectRepository(Subject)
    private readonly subjectRepository: Repository<Subject>,
    @InjectRepository(SubjectData)
    private readonly subjectDataRepository: Repository<SubjectData>,
    @InjectRepository(SupportedVsCurrency)
    private readonly supportedCurrencyDataRepository: Repository<SupportedVsCurrency>,
    @InjectRepository(SubjectHistory)
    private readonly subjectHistoryDataRepository: Repository<SubjectHistory>,
    private readonly configService: ConfigService,
  ) {}

  async onApplicationBootstrap(): Promise<void> {
    await this.fillAssets();
    await this.fillSupportedCurrency();
  }

  @Cron(CronExpression.EVERY_MINUTE)
  async pullCoingeckoCoinData() {
    // await this.loadCoinPriceById('4b9fdbb7-8260-4191-96d6-df9b3b1af796', ['d2f2a2c9-79ea-4d0c-8b67-c6639b50ffe5']);
  }

  private async fillSupportedCurrency() {
    this.logger.log('Checking SupportedVsCurrency...');

    const count = await this.supportedCurrencyDataRepository.count();
    if (count > 0) {
      this.logger.log('Table SupportedVsCurrency Contains data. Skip.');
      return;
    }

    this.logger.log('Table SupportedVsCurrency is empty. Starting load data...');
    const dataToInsert: Pick<SupportedVsCurrency, 'currency'>[] = [{ currency: 'usd' }];
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const currencyList = await this.getRequest<string[]>(this.GET_SUPPORTED_VS_CURRENCY_LIST);

      for (let i = 0; i < currencyList.length; i++) {
        const currency = currencyList[i];
        dataToInsert.push({ currency });
      }
    } catch (error) {
      this.logger.error('Error while load dataset SupportedVsCurrency:', error);
    }

    try {
      await this.supportedCurrencyDataRepository.insert(dataToInsert);
      this.logger.log(`Successful added ${dataToInsert.length} entities in SupportedVsCurrency.`);
    } catch (error) {
      this.logger.error('Error while inserting SupportedVsCurrency:', error);
    }
  }

  private async fillAssets() {
    this.logger.log('Проверка необходимости сидирования таблицы Assets...');

    const count = await this.subjectRepository.count();
    if (count > 0) {
      this.logger.log('Таблица Assets уже содержит данные. Сидирование пропущено.');
      return;
    }

    this.logger.log('Таблица Assets пуста. Начинается генерация стартовых монет...');
    const dataToInsert: Pick<Subject, 'coinId' | 'fullName' | 'symbol'>[] = [];
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const coinList = await this.getRequest<CoinListEntity[]>(this.COIN_LIST_URL);

      for (let i = 0; i < coinList.length; i++) {
        const coin = coinList[i];
        dataToInsert.push({ coinId: coin.id, symbol: coin.symbol, fullName: coin.name });
      }
    } catch (error) {
      this.logger.error('Error while load dataset Assets:', error);
    }

    try {
      await this.subjectRepository.insert(dataToInsert);
      this.logger.log(`Успешно добавлено ${dataToInsert.length} стартовых монет в базу данных.`);
    } catch (error) {
      this.logger.error('Ошибка при сидировании таблицы Assets:', error);
    }
  }

  async loadCoinDataById(coinId: string): Promise<void> {
    try {
      const coin = await this.subjectRepository.findOne({
        where: { coinId: coinId },
        relations: { subjectData: true },
      });
      if (!coin) {
        this.logger.warn(`Coin with id = ${coinId} not found in database`);
        return;
      }
      const coinData = await this.getRequest<CoinDataEntity>(this.GET_COIN_DATA_BY_ID(coinId));
      if (!coin.subjectData) {
        const dataEntity = this.subjectDataRepository.create({
          optionJson: JSON.stringify(coinData),
        });
        coin.subjectData = await this.subjectDataRepository.save(dataEntity);
        await this.subjectRepository.save(coin);
      } else {
        coin.subjectData.optionJson = JSON.stringify(coinData);
        await this.subjectDataRepository.save(coin.subjectData);
      }
    } catch (error) {
      this.logger.error('Failed to load coin data', error);
    }
  }

  async loadCoinPriceById(vsCurrencyId: string, coinIds: string[]): Promise<any> {
    //todo fix any
    const vsCurrency = await this.supportedCurrencyDataRepository.findOne({ where: { id: vsCurrencyId } });
    if (!vsCurrency) {
      return {};
    }
    // const historyData = await this.subjectHistoryDataRepository.find({ where: { subjectId: In(coinIds) } });
    // return historyData.map(x=>{
    //   x.optionJson
    // });
    const coins = await this.subjectRepository.findBy({ id: In(coinIds) });
    const priceData = await this.getRequest<Partial<Record<string, string>>>(this.GET_PRICE, {
      vs_currencies: vsCurrency.currency,
      ids: coins.map((x) => x.coinId),
      include_market_cap: true,
      include_24hr_vol: true,
      include_24hr_change: true,
      include_last_updated_at: true,
    });
    const historyToSave: SubjectHistory[] = [];
    // const coinsToUpdate: Subject[] = [];
    Object.keys(priceData).forEach((data) => {
      const coin = coins.find((x) => (x.coinId = data));
      if (!coin) return;
      const json = priceData[data];
      if (!json) return;

      const entity = this.subjectHistoryDataRepository.create({
        optionJson: json,
        subjectId: coin.id,
        currencyId: vsCurrency.id,
      });
      historyToSave.push(entity);
    });
    // await this.subjectRepository.save(coinsToUpdate);
    await this.subjectHistoryDataRepository.save(historyToSave);
    return priceData;
  }

  private getRequest<T>(url: string, params: unknown = {}): Promise<T> {
    return firstValueFrom(
      this.httpService
        .get<T>(url, {
          'x-cg-demo-api-key': this.configService.getOrThrow<string>('CONGEKO_API_KEY'),
          params: params,
        } as AxiosRequestConfig)
        .pipe(
          catchError((e: AxiosError) => {
            console.error(e);
            throw e;
          }),
          map((response) => response.data),
        ),
    );
  }
}
