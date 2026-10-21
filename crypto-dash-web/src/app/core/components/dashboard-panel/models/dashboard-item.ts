import { GridsterItemConfig } from "angular-gridster2";
import { DashboardType } from "./dashboard-type";

export interface DashboardItem {
    options: DashboardItemOptions;
    id: string;
    name: string;
    type: DashboardType;
    data: DashboardItemData;
    isLoading?: boolean;
    // fields: DashboardField[];
}
export interface DashboardItemOptions extends GridsterItemConfig { }
export interface DashboardItemData {
    chartBaseType: ChartBaseType;
    data: unknown[];
    series: Series[];
    legends: DashboardLegend[];
    loadError?: boolean;
}

export enum ChartBaseType {
    None = 0,
    Polar = 1,
    Cartesian = 2,
    Topology = 3,
    Standalone = 4,
}

export type DashboardItemChanges = Pick<DashboardItem & GridsterItemConfig, 'id' | 'x' | 'y' | 'cols' | 'rows'>;

export interface DashboardLegend {
    name: string;
}
export interface Series {
    type: DashboardDataView;
    xKey: string;
    yKey: string;
}

export enum DashboardDataView {
    // Декартовы графики
    Bar = 1,
    Column = 2,
    Line = 3,
    Area = 4,
    Scatter = 5,
    Bubble = 6,
    Histogram = 7,
    Waterfall = 8,
    BoxPlot = 9,
    RangeBar = 10,
    RangeArea = 11,

    // Круговые и полярные
    Pie = 12,
    Donut = 13,
    RadarLine = 14,
    RadarArea = 15,
    Nightingale = 16,
    RadialColumn = 17,
    RadialBar = 18,

    // Иерархические / Отдельные
    Treemap = 19,
    Sunburst = 20,

    // Специализированные / Топологические
    Heatmap = 21,
    Sankey = 22,
    Chord = 23,
    Funnel = 24,
    Pyramid = 25,

    // Финансовые
    Candlestick = 26,
    Ohlc = 27,

    Table = 28,
}