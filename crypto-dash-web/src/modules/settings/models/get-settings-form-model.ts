import { FormValues } from '../../builders/models/form-data';
import { ToolCode } from '../../layout/models/tool-code';

export class GetSettingsFormModel {
  toolCode: ToolCode;
  formValues?: FormValues;
}
