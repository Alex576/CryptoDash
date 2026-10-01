import { ChangeDetectionStrategy, Component, computed, output } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatAnchor } from '@angular/material/button';
import { MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TranslatePipe } from '@ngx-translate/core';
import { RegisterModel } from '../../../models/auth/register-model';
import { equalsValueValidator } from '../validators/equalsValueValidator';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, FormsModule, MatAnchor, TranslatePipe, MatCard, MatCardTitle, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardActions],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterComponent {
  readonly onSubmit = output<RegisterModel>();
  readonly onCancel = output<void>();

  protected readonly registerForm: FormGroup<{
    login: FormControl<string>;
    password: FormControl<string>;
    repeatPassword: FormControl<string>;
  }> = new FormGroup({
    login: new FormControl<string>(null, { updateOn: 'blur', validators: [Validators.required, Validators.nullValidator, Validators.email] }),
    password: new FormControl<string>(null, { updateOn: 'change', validators: [Validators.required, Validators.nullValidator] }),
    repeatPassword: new FormControl<string>(null, { updateOn: 'change', validators: [Validators.required, Validators.nullValidator] }),
  }, {
    validators: [equalsValueValidator('password', 'repeatPassword')]
  });

  private readonly formStatusChanged = toSignal(this.registerForm.statusChanges);
  protected readonly isRegisterDisabled = computed<boolean>(() => this.formStatusChanged() !== 'VALID');

  onRegister(): void {
    this.onSubmit.emit({ login: this.registerForm.controls.login.value, password: this.registerForm.controls.password.value });
  }

  onBack(): void {
    this.onCancel.emit();
  }
}
