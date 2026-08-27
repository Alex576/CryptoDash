import { DashboardLayout } from './layout-model';
import { ToolCode } from './tool-code';

export class SaveLayoutRequest {
  tool: ToolCode;
  layout: DashboardLayout;
}
