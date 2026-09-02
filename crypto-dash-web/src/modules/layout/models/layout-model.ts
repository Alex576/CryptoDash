import { FormControlData } from '../../settings/models/control-models';
import { DashboardTypeCode } from '../../settings/models/dashboard-type-code';
import { DashboardLayout } from '../../settings/models/settings-layout';

export class LayoutModel {
  data: LayoutDataType;
}

export type LayoutDataType = FormLayout | DashboardLayout | DashboardChartLayout | DashboardTableLayout;

export interface FormLayout {
  controls: FormControlData[];
}

// export interface DashboardLayout {
//   //todo remove copies!
//   items: BaseDashboardItem[];
//   layout: ResponsiveDashboardLayout;
// }

// export interface ResponsiveDashboardLayout {
//   cols: Record<'lg' | 'md' | 'sm' | 'xs' | 'xxs', number>;
//   rowHeight: number;
// }

export interface BaseDashboardItem {
  id: number;
  type: DashboardTypeCode;
  // options: DashboardItemOptions;
}

export interface DashboardChartLayout {
  // id: number;
  // options: DashboardItemOptions;
  type: ChartType;
}

export enum ChartType {
  Bars = 1,
}

export interface DashboardTableLayout {
  columns: string[];
}
