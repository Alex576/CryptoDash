import { ControlType } from '../../builders/models/form';
import { LayoutTypeCode } from '../../layout/models/layout-type-code';
import { DashboardTypeCode } from './dashboard-type-code';

export interface DashboardItem {
  id: number;
  type: DashboardTypeCode;
  options: DashboardItemOptions;
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

export interface DashboardLayout {
  items: DashboardItem[];
  layout: ResponsiveDashboardLayout;
}

export interface ResponsiveDashboardLayout {
  cols: Record<'lg' | 'md' | 'sm' | 'xs' | 'xxs', number>;
  rowHeight: number;
}

export interface DashboardPreviewData {
  layout: ResponsiveDashboardLayout;
  items: DashboardItem[];
}

export interface FormControlPreview {
  id: string;
  name: string;
  type: ControlType;
  editable: boolean;
}

export interface FormPreviewData {
  controls: FormControlPreview[];
}
export type SettingLayoutData = SettingsFormData | DashboardPreviewData;
export interface SettingsFormData {
  form: FormPreviewData;
}
export interface SettingsLayoutItem {
  type: LayoutTypeCode;
  data: SettingLayoutData;
}
export interface SettingsLayout {
  items: SettingsLayoutItem[];
}
