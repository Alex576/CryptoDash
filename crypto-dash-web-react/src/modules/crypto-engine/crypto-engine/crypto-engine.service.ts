import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subject } from '../entities/subject';
import { SubjectModel } from '../models/subject.model';

@Injectable()
export class CryptoEngineService {
  private readonly logger = new Logger(CryptoEngineService.name);

  constructor(
    @InjectRepository(Subject)
    private readonly assetRepository: Repository<Subject>,
  ) {}

  async getAllSubjects(): Promise<SubjectModel[]> {
    return (await this.assetRepository.find()).map((x) => ({
      id: x.id,
      coinId: x.coinId,
      name: x.fullName,
      symbol: x.symbol,
    }));
  }
}
