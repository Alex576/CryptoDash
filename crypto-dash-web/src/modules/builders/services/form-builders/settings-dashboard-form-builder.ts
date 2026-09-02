import { ObjectStorage } from '../../../cache/storages/object-storage.service';
import { ClassCode } from '../../../object-entities/models/class-model';
import { FormControlData } from '../../../settings/models/control-models';
import { TileItemCode } from '../../../settings/models/tile-item-code';
import { ControlSettings, Item } from '../../models/form';
import { FormValues } from '../../models/form-data';
import { BaseFormBuilder } from './base-form-builder';

// @Injectable()
export class SettingsDashboardFormBuilder extends BaseFormBuilder<FormValues> {
  constructor(
    protected controlsData: FormControlData[],
    private objStorage: ObjectStorage,
  ) {
    super(controlsData);
  }

  getComboItems(control: FormControlData, data: FormValues): Item[] {
    switch (control.tileItemCode) {
      // case TileItemCode.Id:
      // case TileItemCode.Name:
      // case TileItemCode.Object:
      case TileItemCode.Class:
        return Object.entries(ClassCode)
          .filter(([key]) => isNaN(Number(key)))
          .map(([key, value]) => ({ id: +value, name: key }));
      // case TileItemCode.Tool:
      // case TileItemCode.TileItem:
      // case TileItemCode.DashboardType:
      //   return [];
      default:
        return super.getComboItems(control, data);
    }
  }

  protected getControlValue(control: FormControlData, data: FormValues, controlSettings: ControlSettings): unknown {
    switch (control.tileItemCode) {
      case TileItemCode.Id:
      case TileItemCode.Name:
        return control.name;
      case TileItemCode.Object:
        return []; // control.settings.objCodes.map((obj) => this.masterData.objects.get(obj));
      case TileItemCode.Class:
        return [];
      case TileItemCode.Tool:
      case TileItemCode.TileItem:
      case TileItemCode.DashboardType:
      default:
        return super.getControlValue(control, data, controlSettings);
    }
  }
}
