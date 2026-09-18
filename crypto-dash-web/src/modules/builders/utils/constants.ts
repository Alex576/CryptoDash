import { FormControlData } from '../../settings/models/control-models';
import { TileItemCode } from '../../settings/models/tile-item-code';
import { ControlType } from '../models/form';

export const FormBuilderHelpers = {
  getFormControlId(control: FormControlData, id: number): string {
    return `${control.tileItemCode}_${control.type}_${id}`;
  },

  tryParseFormControlId(id: string): [TileItemCode, ControlType, number] {
    const parts = id.split('_');
    if (parts.length !== 3) {
      return null;
    }
    return [Number(parts[0]), Number(parts[1]), Number(parts[2])];
  },
};
