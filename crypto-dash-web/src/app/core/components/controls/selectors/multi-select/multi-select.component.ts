import { ChangeDetectionStrategy, Component, effect } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormField, MatLabel, MatOption, MatSelect } from "@angular/material/select";
import { TranslatePipe } from '@ngx-translate/core';
import { isEqual } from '../../../../utils/helper';
import { SearchComponent } from '../../search/search.component';
import { isAnySelectedValidator } from '../../validators/is-any-selected';
import { BaseSelectComponent } from '../base-select/base-select.component';

@Component({
  selector: 'app-multi-select',
  templateUrl: './multi-select.component.html',
  styleUrls: ['./multi-select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatSelect, MatLabel, MatFormField, MatOption, ReactiveFormsModule, TranslatePipe, SearchComponent]
})
export class MultiSelectComponent extends BaseSelectComponent<number[]> {
  protected override isValueEquals(changedValue: number[]): boolean {
    return isEqual(changedValue, this.oldValue);
  }

  constructor() {
    super();

    effect(() => {
      if (this.required()) {
        this.formControl.addValidators(isAnySelectedValidator);
      } else {
        this.formControl.removeValidators(isAnySelectedValidator);
      }
      this.formControl.updateValueAndValidity();
    });
  }
}
