import { FormControlData } from '../../settings/models/control-models';
import { ControlState } from '../../settings/models/control-state';
import { FormControlDataSettings } from '../../settings/models/form-control-data.settings';
import { TileItemCode } from '../../settings/models/tile-item-code';
import { ControlType } from '../models/form';
import { BaseLayoutBuilder } from './base-layout-builder';

export class DashboardFormSettingsBuilder extends BaseLayoutBuilder {
  buildControls(): FormControlData[] {
    const controls: FormControlData[] = [];
    controls.push(
      getControl('Settings.Form.Control.Name', TileItemCode.Name, ControlType.Input, [
        ControlState.IsEditable,
        ControlState.Required,
      ]),
    );
    // const tileItemControl = getControl('Settings.Form.Control.TileItem', TileItemCode.TileItem, ControlType.Combo, [
    //   ControlState.IsEditable,
    //   ControlState.Required,
    // ]);
    // controls.push(tileItemControl);
    // controls.push(
    //   getControl(
    //     'Settings.Form.Control.Objects',
    //     TileItemCode.Object,
    //     ControlType.Combo,
    //     [ControlState.IsEditable, ControlState.Required, ControlState.IsMultiple],
    //     { dependencies: [new ControlDependency(tileItemControl, (c) => c.value === TileItemCode.Object)] },
    //   ),
    // );
    controls.push(
      getControl('Settings.Form.Control.DashboardType', TileItemCode.DashboardType, ControlType.Combo, [
        ControlState.IsEditable,
        ControlState.Required,
      ]),
    );
    controls.push(
      getControl('Settings.Form.Control.Objects', TileItemCode.Object, ControlType.Combo, [
        ControlState.IsEditable,
        ControlState.Required,
        ControlState.IsMultiple,
      ]),
    );
    return controls;

    function getControl(
      name: string,
      tileItemCode: TileItemCode,
      type: ControlType,
      states: ControlState[],
      settings: FormControlDataSettings = undefined,
    ): FormControlData {
      return {
        name,
        tileItemCode,
        type,
        states,
        settings,
      };
    }
  }
}
