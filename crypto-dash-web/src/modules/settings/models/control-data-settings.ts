import { ControlType } from '../../builders/models/form';
import { TileItemCode } from './tile-item-code';

export interface ControlDataSettings {
  name: string;
  type: ControlType;
  tileItemCode: TileItemCode;
  variableData: VariableData;
}

export interface VariableData {
  objCodes: number[];
}
