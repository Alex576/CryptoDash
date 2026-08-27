import { ControlType } from '../../../share/form';

export enum ControlState {
  Required = 1,
  IsMultiple = 2,
  SelectFirstValueIfEmpty = 3,
}

export enum ControlItemCode {
  Tool = 1,
}

export type FormControlDataSettings = ObjectControlDataSettings;

export interface ObjectControlDataSettings {
  objs: number[];
  classCodes: number[];
}

export interface FormControlData {
  name: string;
  controlItemCode: ControlItemCode;
  type: ControlType;
  states: ControlState[];
  settings: FormControlDataSettings;
}
