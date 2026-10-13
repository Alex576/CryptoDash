import { ChangeDetectionStrategy, Component, computed, effect, input, output, untracked } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TranslatePipe } from '@ngx-translate/core';
import { ControlSettings } from '../../../models/controls/control-settings';
import { DateRange } from '../../../models/controls/date-range';
import { FormControl as Control } from '../../../models/controls/form-control';
import { isEqual } from '../../../utils/helper';

@Component({
  selector: 'app-date-range',
  templateUrl: './date-range.component.html',
  styleUrls: ['./date-range.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatFormFieldModule, MatDatepickerModule, TranslatePipe, ReactiveFormsModule],
  providers: [provideNativeDateAdapter()],
})
export class DateRangeComponent {
  readonly control = input.required<Control<ControlSettings, DateRange>>();

  readonly valueChanged = output<Control>();
  readonly validChanged = output<Control>();

  protected oldValue: DateRange;

  protected readonly formControl: FormGroup<{ start: FormControl<Date | null>, end: FormControl<Date | null>; }> = new FormGroup({
    start: new FormControl<Date | null>(null, { updateOn: 'blur' }),
    end: new FormControl<Date | null>(null, { updateOn: 'blur' })
  });
  protected readonly controlValueChanged = toSignal(this.formControl.valueChanges);
  protected readonly controlStatusChanged = toSignal(this.formControl.statusChanges);

  protected readonly isInvalid = computed<boolean>(() => this.controlStatusChanged() === 'INVALID');

  protected readonly settings = computed<ControlSettings>(() => this.control().settings);
  protected readonly name = computed<string>(() => this.control().name);
  protected readonly value = computed<DateRange>(() => this.control().value as DateRange);

  protected readonly editable = computed<boolean>(() => this.settings().editable);
  protected readonly required = computed<boolean>(() => this.settings().required);
  protected readonly updated = computed<boolean>(() => this.control().updated);

  constructor() {
    effect(() => {
      const controlState = this.controlStatusChanged();
      const control = this.control();
      const prevState = control.settings.invalid;
      control.settings.invalid = controlState === 'INVALID';
      if (control.settings.invalid || prevState !== control.settings.invalid) {
        this.validChanged.emit(control);
      }
    });

    effect(() => {
      const control = untracked(() => this.control());
      const changedValue = this.controlValueChanged();
      if (changedValue?.start && changedValue?.end && (!isEqual(changedValue.start, this.oldValue?.from) || !isEqual(changedValue.end, this.oldValue?.to))) {
        control.value = { from: changedValue.start, to: changedValue.end };
        this.valueChanged.emit(control);
        this.oldValue = { from: changedValue.start, to: changedValue.end };
      }
    });

    effect(() => {
      const value = this.value();
      this.oldValue = value;
      this.formControl.setValue({ start: value.from, end: value.to }, { emitEvent: false });
    });

    effect(() => {
      if (this.required()) {
        this.formControl.setValidators(Validators.required);
      } else {
        this.formControl.removeValidators(Validators.required);
      }
      this.formControl.updateValueAndValidity();
    });

    effect(() => {
      if (this.editable()) {
        this.formControl.enable();
      } else {
        this.formControl.disable();
      }
    });
  }
}
