import { AgPolarSeriesOptions } from 'ag-charts-community';
import { GridsterItemConfig } from "angular-gridster2";
import { DashboardType } from "./dashboard-type";

export interface DashboardItem {
    options: GridsterItemConfig;
    id: string;
    name: string;
    type: DashboardType;
    data: DashboardItemData;
    // fields: DashboardField[];
}

export interface DashboardItemData {
    data: unknown[];
    // series: {
    //     type: string;
    //     xKey: string;
    //     yKey: string;

    // };
    series: AgPolarSeriesOptions[];
}

export type DashboardItemChanges = Pick<DashboardItem & GridsterItemConfig, 'id' | 'x' | 'y' | 'cols' | 'rows'>;
// export interface DashboardField {
//     name: string;
//     value: unknown;
// }