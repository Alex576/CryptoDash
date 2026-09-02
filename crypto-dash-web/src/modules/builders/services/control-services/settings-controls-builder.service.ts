import { Injectable, NotImplementedException } from '@nestjs/common';
import { LayoutTypeCode } from '../../../layout/models/layout-type-code';
import { ToolCode } from '../../../layout/models/tool-code';
import { FormControlData } from '../../../settings/models/control-models';
import { ControlState } from '../../../settings/models/control-state';
import { FormControlPreview } from '../../../settings/models/settings-layout';
import { TileItemCode } from '../../../settings/models/tile-item-code';
import { ComboSettings, ControlSettings, ControlType, FormControl, Item } from '../../models/form';
import { SettingsDataModel } from '../../models/settings-controls-builder-models';
import { BaseControlsBuilderService } from './base-controls-builder.service';

@Injectable()
export class SettingsControlsBuilderService extends BaseControlsBuilderService<SettingsDataModel> {
  getComboItems(control: FormControlData, data: SettingsDataModel): Item[] {
    switch (control.tileItemCode) {
      case TileItemCode.Tool:
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

  getControls(tool: ToolCode, layoutCode: LayoutTypeCode) {
    throw new Error('Method not implemented.');
  }

  getControlsPreview(controls: FormControlData[]): FormControlPreview[] {
    return controls.map((c, index) => ({
      id: this.getControlId(c, index),
      name: c.name,
      type: c.type,
      editable: this.isEditable(c),
    }));
  }
}
