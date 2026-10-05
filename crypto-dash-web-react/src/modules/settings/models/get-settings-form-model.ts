import { FormValues } from '../../builders/models/form-data';
import { ToolCode } from '../../layout/models/tool-code';

export class GetSettingsFormModel {
  toolCode: ToolCode;
  dashboardId?: number;
  formValues?: FormValues;
}

export class SaveSettingsFormModel {
  toolCode: ToolCode;
  dashboardId?: number;
  formValues: FormValues;
}
