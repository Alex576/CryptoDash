import { FormControl } from '../../builders/models/form';
import { FormControlData } from './control-models';

export interface FormControlDataSettings {
  dependencies: ControlDependency[];
  objCodes: number[];
}

export class ControlDependency {
  constructor(
    private readonly target: FormControlData,
    private readonly condition: (control: FormControl) => boolean,
  ) {}

  showControl(control: FormControl): boolean {
    return this.condition(control);
  }
}
