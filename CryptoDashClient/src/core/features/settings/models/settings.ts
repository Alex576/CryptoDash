import type { ResponsiveDashboardLayout } from "@/core/components/Dashboard/models/DashboardModels";
import type { ControlType, FormControl } from "@/core/components/Form/models/FormModels";
import type { ToolCode } from "@/core/share/tool-code";

export enum LayoutTypeCode {
    Layout = 1,
    Form = 2,
    Filter = 3,
    Table = 4,
    Dashboard = 5,
    DashboardItem = 6,
}

export enum DashboardTypeCode {
    Chart = 1,
    Table = 2,
}

export interface DashboardItem {
    id: number;
    type: DashboardTypeCode;
    options: DashboardItemOptions;
}
export interface DashboardItemOptions {
    x: number;
    y: number;
    width: number;
    height: number;
    maxWidth?: number;
    minWidth?: number;
    draggable?: boolean;
    resizable?: boolean;
}
export interface DashboardOptions {
    columns: number;
    rowHeight: number;
}
export interface DashboardPreviewData {
    layout: ResponsiveDashboardLayout;
    items: DashboardItem[];
}
export interface FormControlPreview {
    id: string;
    name: string;
    type: ControlType;
    editable: boolean;
}
export interface FormPreviewData {
    controls: FormControlPreview[];
}

export type SettingLayoutData = SettingsFormData | DashboardPreviewData;

export interface SettingsFormData {
    form: FormPreviewData;
}

export interface SettingsLayoutItem {
    type: LayoutTypeCode;
    data: SettingLayoutData;
}

export interface SettingsLayout {
    items: SettingsLayoutItem[];
}

export interface SettingFilters {
    toolFilter: FormControl;
}


export interface GetSettingsFiltersModel {
    toolCode?: ToolCode;
}


export interface GetSettingsLayoutModel {
    toolCode: ToolCode;
}
