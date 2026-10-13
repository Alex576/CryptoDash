import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from '@angular/material/input';
import { TranslatePipe } from '@ngx-translate/core';
import { isEqual } from '../../../utils/helper';
import { BaseControlComponent } from '../base-control/base-control.component';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatFormFieldModule, MatInputModule, ReactiveFormsModule, TranslatePipe]
})
export class InputComponent extends BaseControlComponent<string> {
  protected override isValueEquals(changedValue: string): boolean {
    return isEqual(changedValue, this.oldValue);
  }

  constructor() {
    super();
  }
}
