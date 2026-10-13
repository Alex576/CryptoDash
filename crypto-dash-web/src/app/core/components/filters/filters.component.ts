import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { ComboControl } from '../../models/controls/combo-control';
import { ControlType } from '../../models/controls/control-type';
import { FormControl } from '../../models/controls/form-control';
import { FormValues, getFormValues } from '../../models/form-editor/form-values';
import { DateRangeComponent } from '../controls/date-range/date-range.component';
import { SelectSwitchComponent } from "../controls/selectors/select-switch/select-switch.component";

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SelectSwitchComponent, DateRangeComponent]
})
export class FiltersComponent {
  readonly filters = input.required<ComboControl[], ComboControl[] | ComboControl | null>({
    transform: (filers: ComboControl | ComboControl[] | null) => {
      if (!filers) {
        return [];
      }
      if (Array.isArray(filers)) {
        return filers;
      }
      return [filers];
    }
  });

  readonly valueChanged = output<FormValues>();

  protected readonly controlType = ControlType;

  onValueChanged(_control: FormControl): void {
    this.valueChanged.emit(getFormValues(this.filters()));
  }
}
