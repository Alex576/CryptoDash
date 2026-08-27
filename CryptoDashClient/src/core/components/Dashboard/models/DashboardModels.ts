import type { ToolCode } from "@/core/share/tool-code";

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
    id: number;
    tool: ToolCode;
    type: ChartType;
    data?: unknown;
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
    id: number;
}


export enum ChartType {
    Bars = 1,
}


export enum DashboardItemType {
    Chart = 1,
    Table = 2,
}