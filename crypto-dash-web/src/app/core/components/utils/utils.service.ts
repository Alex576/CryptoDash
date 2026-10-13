import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UtilsApiService } from './utils-api.service';

@Injectable()
export class UtilsService {
  private readonly api = inject(UtilsApiService);

  constructor() { }

  pullCoinList(): Observable<void> {
    return this.api.pullCoinList();
  }

  pullCurrencies(): Observable<void> {
    return this.api.pullCurrencies();
  }
}
