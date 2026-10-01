import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { OperationResultData } from '../../../models/operation-result/operation-result';
import { isError, isSuccess } from '../../../models/operation-result/result-code';

import { LoginModel } from '../../../models/auth/login-model';
import { LoginResult } from '../../../models/auth/login-result';
import { RegisterModel } from '../../../models/auth/register-model';
import { NavigationService } from '../../../services/navigation.service';
import { NotificationService } from '../../../services/notification.service';
import { ToolbarService } from '../../../services/toolbar.service';
import { AuthenticationApiService } from './authentication-api.service';

@Injectable()
export class AuthenticationService {
  private readonly api = inject(AuthenticationApiService);
  private readonly toolbar = inject(ToolbarService);
  private readonly notificationService = inject(NotificationService);
  private readonly navigationService = inject(NavigationService);

  login(model: LoginModel): Observable<void> {
    return this.api.login(model)
      .pipe(
        map(({ data: result, code, description }: OperationResultData<LoginResult>) => {
          if (isError(code)) {
            this.notificationService.notifyError(description || 'Wrong user name or password');
          }
          if (isSuccess(code)) {
            this.notificationService.notify(description || 'Login success');
            this.toolbar.setUser(result.id, result.email, result.accessToken);
            this.navigationService.navigateDefaultOrReturnUrl();
          }
          return;
        })
      );
  }

  register(model: RegisterModel): Observable<void> {
    return this.api.register(model)
      .pipe(
        map(({ data: result, code, description }: OperationResultData<LoginResult>) => {
          if (isError(code)) {
            this.notificationService.notifyError(description || 'Something went wrong');
          }
          if (isSuccess(code)) {
            this.notificationService.notify(description || 'Register successful');
            this.toolbar.setUser(result.id, result.email, result.accessToken);
            this.navigationService.navigateDefaultOrReturnUrl();
          }
          return;
        })
      );
  }

  logout(id: number): Observable<void> {
    return this.api.logout(id);
  }
}
