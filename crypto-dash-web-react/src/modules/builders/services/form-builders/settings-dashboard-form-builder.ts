import { NotImplementedSwitchError } from '../../../../share/not-implemented-exception';
import { ObjectStorage } from '../../../cache/storages/object-storage.service';
import { ClassCode } from '../../../object-entities/models/class-model';
import { FormControlData } from '../../../settings/models/control-models';
import { DashboardItemData } from '../../../settings/models/dashboard-item-data';
import { DashboardTypeCode } from '../../../settings/models/dashboard-type-code';
import { TileItemCode } from '../../../settings/models/tile-item-code';
import { ControlSettings, Item } from '../../models/form';
import { FormControlDataValue } from '../../models/form-data';
import { FormBuilderHelpers } from '../../utils/constants';
import { BaseFormBuilder } from './base-form-builder';

// @Injectable()
export class SettingsDashboardFormBuilder extends BaseFormBuilder<DashboardItemData> {
  constructor(
    protected controlsData: FormControlData[],
    private objStorage: ObjectStorage,
  ) {
    super(controlsData);
  }

  protected updateDataByFormValue(data: DashboardItemData, controlValue: FormControlDataValue): void {
    const tileItemCode = FormBuilderHelpers.tryParseFormControlId(controlValue.id)?.[0];
    const { value } = controlValue;
    switch (tileItemCode) {
      case TileItemCode.Id:
      case TileItemCode.Name:
        data.name = value as string;
        break;
      case TileItemCode.Object:
      case TileItemCode.Class:
      case TileItemCode.Tool:
      case TileItemCode.TileItem:
      case TileItemCode.DashboardType:
        data.type = value as DashboardTypeCode;
        break;
      default:
        throw new NotImplementedSwitchError(tileItemCode);
    }
  }

  getComboItems(control: FormControlData, data: DashboardItemData): Item[] {
    switch (control.tileItemCode) {
      // case TileItemCode.Id:
      // case TileItemCode.Name:
      case TileItemCode.Object:
        return [];
      case TileItemCode.Class:
        return Object.entries(ClassCode)
          .filter(([key]) => isNaN(Number(key)))
          .map(([key, value]) => ({ id: +value, name: key }));
      // case TileItemCode.Tool:
      // case TileItemCode.TileItem:
      case TileItemCode.DashboardType:
        return Object.entries(DashboardTypeCode)
          .filter(([key]) => isNaN(Number(key)))
          .map(([key, value]) => ({ id: +value, name: key }));
      //   return [];
      default:
        return super.getComboItems(control, data);
    }
  }

  protected getControlValue(
    control: FormControlData,
    data: DashboardItemData,
    controlSettings: ControlSettings,
  ): unknown {
    switch (control.tileItemCode) {
      case TileItemCode.Id:
      case TileItemCode.Name:
        return data.name;
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
