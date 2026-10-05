import { HttpContextToken } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RefreshTokenModel } from '../models/auth/refresh-token-model';
import { BaseApiService } from '../services/base-api.service';

export const IS_REFRESH_TOKEN = new HttpContextToken<boolean>(() => false);
@Injectable({
  providedIn: 'root'
})
export class AuthorizationApiService extends BaseApiService {
  private readonly UPDATE_ACCESS_TOKEN = 'Authorization/RefreshToken';

  refreshToken(): Observable<RefreshTokenModel> {
    return this.get<RefreshTokenModel>(this.UPDATE_ACCESS_TOKEN, { withCredentials: true });
  }
}
