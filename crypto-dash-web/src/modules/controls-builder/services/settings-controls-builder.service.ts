import { Injectable, NotImplementedException } from '@nestjs/common';
import { ComboSettings, ControlSettings, ControlType, FormControl, Item } from '../../../share/form';
import { ControlItemCode, ControlState, FormControlData } from '../../layout/models/control-models';
import { LayoutTypeCode } from '../../layout/models/layout-type-code';
import { ToolCode } from '../../layout/models/tool-code';
import { SettingsDataModel } from '../models/settings-controls-builder-models';
import { BaseControlsBuilderService } from './base-controls-builder.service';

@Injectable()
export class SettingsControlsBuilderService extends BaseControlsBuilderService<SettingsDataModel> {
  getComboItems(control: FormControlData, data: SettingsDataModel): Item[] {
    switch (control.controlItemCode) {
      case ControlItemCode.Tool:
        return data.tools.map((x) => ({ id: x.id, name: x.name }));
      default:
        throw new NotImplementedException();
    }
  }

  protected getControlValue(
    control: FormControlData,
    data: SettingsDataModel,
    controlSettings: ControlSettings,
  ): unknown {
    if (
      control.type === ControlType.Combo &&
      control.states.includes(ControlState.SelectFirstValueIfEmpty) &&
      controlSettings instanceof ComboSettings
    ) {
      if (!controlSettings.items?.length) {
        return controlSettings.isMultiple ? [] : null;
      }
      return controlSettings.isMultiple
        ? controlSettings.items.slice(0, 1).map((x) => x.id)
        : controlSettings.items[0].id;
    }
    return super.getControlValue(control, data, controlSettings);
  }

  getFilters(tool: ToolCode | undefined, controls: FormControlData[], data: SettingsDataModel): FormControl[] {
    return this.buildControls(controls, data);
  }

  getFormControls(tool: ToolCode, layoutCode: LayoutTypeCode) {
    throw new Error('Method not implemented.');
  }
}
