import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApiService } from '../../services/base-api.service';

@Injectable({
  providedIn: 'root'
})
export class UtilsApiService extends BaseApiService {
  private readonly PULL_COIN_LIST = 'Utils/PullCoinList';
  private readonly PULL_CURRENCIES = 'Utils/PullCurrencies';

  constructor() {
    super();
  }

  pullCoinList(): Observable<void> {
    return this.post(this.PULL_COIN_LIST, {});
  }

  pullCurrencies(): Observable<void> {
    return this.post(this.PULL_CURRENCIES, {});
  }
}
