import type { FormControl } from "@/core/components/Form/models/FormModels";
import type { ToolCode } from "@/core/share/tool-code";

export interface SettingsLayout {
    toolFilter: FormControl;
}


export interface GetSettingsFiltersModel {
    toolCode?: ToolCode;
}


export interface GetSettingsLayoutModel {
    toolCode: ToolCode;
}
