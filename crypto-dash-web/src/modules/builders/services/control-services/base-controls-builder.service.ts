import { NotImplementedException } from '@nestjs/common';
import { LayoutTypeCode } from '../../../layout/models/layout-type-code';
import { ToolCode } from '../../../layout/models/tool-code';
import { FormControlData } from '../../../settings/models/control-models';
import { ControlState } from '../../../settings/models/control-state';
import {
  BaseControlSettings,
  ComboSettings,
  ControlSettings,
  ControlType,
  FormControl,
  InputSettings,
  Item,
} from '../../models/form';

export abstract class BaseControlsBuilderService<TData = unknown> {
  // abstract getFilters(tool: ToolCode | undefined, controls: FormControlData[], data: TData): FormControl[];
  abstract getControls(tool: ToolCode, layoutCode: LayoutTypeCode);
  abstract getComboItems(control: FormControlData, data: TData): Item[];

  protected buildControls(controls: FormControlData[], data: TData): FormControl[] {
    return controls.map((control, index) => this.buildControl(control, data, index));
  }

  protected buildControl(control: FormControlData, data: TData, id: number = 0): FormControl {
    const controlSettings = this.getControlSettings(control, data);

    return {
      id: this.getControlId(control, id),
      name: control.name,
      type: control.type,
      settings: controlSettings,
      value: this.getControlValue(control, data, controlSettings),
    };
  }

  protected getControlId(control: FormControlData, id: number): string {
    return control.customId ?? `${control.name}_${control.type}_${id}`;
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
    settings.isEditable = this.isEditable(control);
    return settings;
  }

  protected isEditable(control: FormControlData): boolean {
    return control.states.includes(ControlState.IsEditable);
  }

  private isRequired(control: FormControlData): boolean {
    return control.states.includes(ControlState.Required);
  }

  private isMultiple(control: FormControlData): boolean {
    return control.states.includes(ControlState.IsMultiple);
  }
}
