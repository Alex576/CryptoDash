import { DashboardTypeCode } from './dashboard-type-code';

export interface DashboardItemData {
  id: number;
  name: string;
  type: DashboardTypeCode;
}
