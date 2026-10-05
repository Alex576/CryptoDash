import { ChangeDetectionStrategy, Component, computed, output } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatAnchor } from '@angular/material/button';
import { MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle } from '@angular/material/card';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from '@angular/material/input';
import { TranslatePipe } from '@ngx-translate/core';
import { LoginModel } from '../../../models/auth/login-model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatAnchor,
    TranslatePipe,
    MatCard,
    MatCardTitle,
    MatCardContent,
    MatCardHeader,
    MatCardSubtitle,
    MatCardActions,
  ],
})
export class LoginComponent {
  readonly onSubmit = output<LoginModel>();
  readonly onRegisterForm = output<void>();

  protected readonly loginForm: FormGroup<{
    login: FormControl<string>;
    password: FormControl<string>;
  }> = new FormGroup({
    login: new FormControl<string>('admin@admin.com', { updateOn: 'blur', validators: [Validators.required, Validators.nullValidator, Validators.email] }),
    password: new FormControl<string>('admin', { updateOn: 'change', validators: [Validators.required, Validators.nullValidator] }),
  });
  private readonly formStatusChanged = toSignal(this.loginForm.statusChanges);
  protected readonly isLoginDisabled = computed<boolean>(() => this.formStatusChanged() !== 'VALID');

  onRegister(): void {
    this.onRegisterForm.emit();
  }

  onLogin() {
    this.onSubmit.emit({ login: this.loginForm.controls.login.value, password: this.loginForm.controls.password.value });
  }
}
