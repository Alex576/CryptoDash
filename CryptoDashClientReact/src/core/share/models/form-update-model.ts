import type { FormValues } from "@/core/components/Form/models/FormModels";
import type { ToolCode } from "@/core/share/tool-code";


export interface FormUpdateModel {
    toolCode: ToolCode;

    formValues: FormValues;
}
