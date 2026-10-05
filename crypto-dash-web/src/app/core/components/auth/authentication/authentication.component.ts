import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { catchError, EMPTY, tap } from 'rxjs';
import { LocalStorageKeys } from '../../../models/local-storage-keys';

import { LoginModel } from '../../../models/auth/login-model';
import { RegisterModel } from '../../../models/auth/register-model';
import { UserModel } from '../../../models/auth/user-model';
import { StorageService } from '../../../services/storage.service';
import { LoginComponent } from "../login/login.component";
import { RegisterComponent } from "../register/register.component";
import { AuthenticationService } from './authentication.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss'],
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, FormsModule, RegisterComponent, LoginComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [AuthenticationService],
})
export class AuthenticationComponent {
  private readonly authService = inject(AuthenticationService);
  private readonly storageService = inject(StorageService);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly isLoginForm = signal<boolean>(true);

  constructor() {
    const userId = this.storageService.getValue<UserModel>(LocalStorageKeys.UserId)?.id ?? null;
    if (userId) {
      this.authService.logout(userId)
        .pipe(
          catchError(() => {
            return EMPTY;
          }),
          tap({
            next: () => {
              this.storageService.remove(LocalStorageKeys.Token);
              this.storageService.remove(LocalStorageKeys.UserId);
            }
          }),
          takeUntilDestroyed()
        )
        .subscribe();
    }
  }

  onLogin(model: LoginModel): void {
    this.authService.login(model)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe();
  }

  onSwitchForm(): void {
    this.isLoginForm.update(x => !x);
  }

  onRegister(model: RegisterModel): void {
    this.authService.register(model)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe();
  }
}
