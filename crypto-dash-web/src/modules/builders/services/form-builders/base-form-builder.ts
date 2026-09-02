import { LayoutTypeCode } from '../../../layout/models/layout-type-code';
import { ToolCode } from '../../../layout/models/tool-code';
import { FormControlData } from '../../../settings/models/control-models';
import { Form, Item } from '../../models/form';
import { BaseControlsBuilderService } from '../control-services/base-controls-builder.service';

export class BaseFormBuilder<TData = unknown> extends BaseControlsBuilderService<TData> {
  constructor(protected controlsData: FormControlData[]) {
    super();
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
    throw new Error('Method not implemented.');
  }
}
