import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginModel } from '../../../models/auth/login-model';
import { LoginResult } from '../../../models/auth/login-result';
import { RegisterModel } from '../../../models/auth/register-model';
import { OperationResultData } from '../../../models/operation-result/operation-result';
import { BaseApiService } from '../../../services/base-api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationApiService extends BaseApiService {

  private readonly LOGIN = 'Authentication/Login';
  private readonly REGISTER = 'Authentication/Register';
  private readonly LOGOUT = 'Authentication/Logout';

  login(model: LoginModel): Observable<OperationResultData<LoginResult>> {
    return this.http.post<OperationResultData<LoginResult>>(`${this.baseUrl}${this.LOGIN}`, model, { withCredentials: true });
  }

  register(model: RegisterModel): Observable<OperationResultData<LoginResult>> {
    return this.http.post<OperationResultData<LoginResult>>(`${this.baseUrl}${this.REGISTER}`, model, { withCredentials: true });
  }

  logout(id: number): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}${this.LOGOUT}`, { id });
  }
}
