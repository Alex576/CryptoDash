import { DashboardItemOptions } from "../../components/dashboard-panel/models/dashboard-item";

export interface DashboardLayoutUserSettings {
    items: { [itemId: string]: DashboardItemOptions; };
}