export class LayoutModel {
  data: LayoutDataType;
}

export type LayoutDataType = DashboardLayout | DashboardChartLayout | DashboardTableLayout;

export interface DashboardLayout {
  items: BaseDashboardItem[];
  layout: ResponsiveDashboardLayout;
}

export interface ResponsiveDashboardLayout {
  cols: Record<'lg' | 'md' | 'sm' | 'xs' | 'xxs', number>;
  rowHeight: number;
}

export interface BaseDashboardItem {
  id: number;
  type: DashboardItemType;
  options: DashboardItemOptions;
}

export interface DashboardChartLayout {
  // id: number;
  // options: DashboardItemOptions;
  type: ChartType;
}

export enum ChartType {
  Bars = 1,
}

export enum DashboardItemType {
  Chart = 1,
  Table = 2,
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

export interface DashboardTableLayout {
  columns: string[];
}
