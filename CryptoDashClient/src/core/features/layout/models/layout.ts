import type { BaseDashboardItem, DashboardItemType, ResponsiveDashboardLayout } from "@/core/components/Dashboard/models/DashboardModels";
import type { ToolCode } from "@/core/share/tool-code";

export interface DashboardLayout {
    items: BaseDashboardItem[];
    layout: ResponsiveDashboardLayout;
}

export interface AddLayoutItemRequest {
    tool: ToolCode;
    type: DashboardItemType;
}

export interface DashboardChartLayoutRequest {
    id: number;
    tool: ToolCode;
}

export interface AddLayoutItemResponse {
    id: number;
    type: DashboardItemType;
    options: BaseDashboardItem;
}
