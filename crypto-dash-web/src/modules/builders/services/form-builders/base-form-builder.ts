import { NotImplementedSwitchError } from '../../../../share/not-implemented-exception';
import { LayoutTypeCode } from '../../../layout/models/layout-type-code';
import { ToolCode } from '../../../layout/models/tool-code';
import { FormControlData } from '../../../settings/models/control-models';
import { Form, Item } from '../../models/form';
import { FormControlDataValue, FormValues } from '../../models/form-data';
import { BaseControlsBuilderService } from '../control-services/base-controls-builder.service';

export abstract class BaseFormBuilder<TData = unknown> extends BaseControlsBuilderService<TData> {
  constructor(protected controlsData: FormControlData[]) {
    super();
  }
  protected abstract updateDataByFormValue(data: TData, controlValue: FormControlDataValue): void;

  updateDataByFormValues(data: TData, formValues?: FormValues): void {
    if (!formValues?.controlsValue?.length) {
      return;
    }
    for (let i = 0; i < formValues.controlsValue.length; i++) {
      const value = formValues.controlsValue[i];
      this.updateDataByFormValue(data, value);
    }
  }

  getForm(data: TData): Form {
    const form: Form = {
      controls: this.buildControls(this.controlsData, data),
    };
    return form;
  }

  getControls(tool: ToolCode, layoutCode: LayoutTypeCode) {
    throw new Error('Method not implemented.');
  }

  getComboItems(control: FormControlData, data: unknown): Item[] {
    throw new NotImplementedSwitchError(control.tileItemCode);
  }
}
