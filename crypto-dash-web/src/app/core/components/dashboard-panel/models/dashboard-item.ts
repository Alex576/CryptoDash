import { AgPolarSeriesOptions } from 'ag-charts-community';
import { GridsterItemConfig } from "angular-gridster2";
import { DashboardType } from "./dashboard-type";

export interface DashboardItem {
    options: GridsterItemConfig;
    id: string;
    name: string;
    type: DashboardType;
    data: DashboardItemData;
    isLoading?: boolean;
    // fields: DashboardField[];
}

export interface DashboardItemData {
    data: unknown[];
    series: AgPolarSeriesOptions[];
    loadError?: boolean;
}

export type DashboardItemChanges = Pick<DashboardItem & GridsterItemConfig, 'id' | 'x' | 'y' | 'cols' | 'rows'>;
// export interface DashboardField {
//     name: string;
//     value: unknown;
// }