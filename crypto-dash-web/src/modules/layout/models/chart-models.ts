import { DashboardTypeCode } from '../../settings/models/dashboard-type-code';
import { BaseDashboardItem } from './layout-model';
import { ToolCode } from './tool-code';

export class DashboardChartLayoutRequest {
  id: number;
  toolCode: ToolCode;
}

export class AddLayoutItemRequest {
  tool: ToolCode;
  type: DashboardTypeCode;
}

export interface DashboardChartLayoutResponse {
  id: number;
  tool: ToolCode;
  //todo set some data
}

export interface AddLayoutItemResponse {
  id: number;
  type: DashboardTypeCode;
  options: BaseDashboardItem;
}
