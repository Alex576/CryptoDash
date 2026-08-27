import { NotImplementedException } from '@nestjs/common';
import {
  BaseControlSettings,
  ComboSettings,
  ControlSettings,
  ControlType,
  FormControl,
  InputSettings,
  Item,
} from '../../../share/form';
import { ControlState, FormControlData } from '../../layout/models/control-models';
import { LayoutTypeCode } from '../../layout/models/layout-type-code';
import { ToolCode } from '../../layout/models/tool-code';

export abstract class BaseControlsBuilderService<TData = unknown> {
  abstract getFilters(tool: ToolCode | undefined, controls: FormControlData[], data: TData): FormControl[];
  abstract getFormControls(tool: ToolCode, layoutCode: LayoutTypeCode);
  abstract getComboItems(control: FormControlData, data: TData): Item[];

  protected buildControls(controls: FormControlData[], data: TData): FormControl[] {
    return controls.map((control, index) => this.buildControl(control, data, index));
  }

  protected buildControl(control: FormControlData, data: TData, id: number = 0): FormControl {
    const controlSettings = this.getControlSettings(control, data);

    return {
      id: `${control.name}_${control.type}_${id}`,
      name: control.name,
      type: control.type,
      settings: controlSettings,
      value: this.getControlValue(control, data, controlSettings),
    };
  }

  protected getControlValue(control: FormControlData, data: TData, controlSettings: ControlSettings): unknown {
    return null;
  }

  private getControlSettings(control: FormControlData, data: TData): ControlSettings {
    let settings: BaseControlSettings;
    switch (control.type) {
      case ControlType.Combo:
        {
          settings = new ComboSettings({
            items: this.getComboItems(control, data),
            isMultiple: this.isMultiple(control),
          });
        }
        break;
      case ControlType.Input:
        {
          settings = new InputSettings();
        }
        break;
      case ControlType.Toggle:
        throw new NotImplementedException();
      default:
        throw new NotImplementedException();
    }
    return settings;
  }

  private isRequired(control: FormControlData): boolean {
    return control.states.includes(ControlState.Required);
  }

  private isMultiple(control: FormControlData): boolean {
    return control.states.includes(ControlState.IsMultiple);
  }
}
