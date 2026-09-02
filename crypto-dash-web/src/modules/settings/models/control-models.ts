import { ControlType } from '../../builders/models/form';
import { ControlState } from './control-state';
import { FormControlDataSettings } from './form-control-data.settings';
import { TileItemCode } from './tile-item-code';

export interface FormControlData {
  name: string;
  tileItemCode: TileItemCode;
  type: ControlType;
  states: ControlState[];
  settings: FormControlDataSettings;

  customId?: string;
}
