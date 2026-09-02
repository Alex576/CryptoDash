import { DashboardLayout } from '../../settings/models/settings-layout';
import { ToolCode } from './tool-code';

export class SaveLayoutRequest {
  tool: ToolCode;
  layout: DashboardLayout;
}
