import { DashboardItem } from '../components/dashboard-panel/models/dashboard-item';
import { DashboardOptions } from '../components/dashboard-panel/models/dashboard-options';


export interface DashboardLayout {
    options: DashboardOptions;
    items: DashboardItem[];
}
