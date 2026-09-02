import {
  LayoutTypeCode,
  type DashboardPreviewData,
  type SettingsFormData,
  type SettingsLayoutItem,
} from "@/core/features/settings/models/settings";
import { DashboardPreview } from "../DashboardPreview";
import { FormPreview } from "../FormPreview";

export interface SettingsLayoutSwitchProps {
  element: SettingsLayoutItem;
}

export function SettingsLayoutSwitch({ element }: SettingsLayoutSwitchProps) {
  const layoutSwitch = () => {
    switch (element.type) {
      case LayoutTypeCode.Form:
        return <FormPreview data={element.data as SettingsFormData} />;
      case LayoutTypeCode.Filter:
        return <div>NotImplemented</div>;
      case LayoutTypeCode.Table:
        return <div>NotImplemented</div>;
      case LayoutTypeCode.Dashboard:
        return <DashboardPreview data={element.data as DashboardPreviewData} />;
      case LayoutTypeCode.DashboardItem:
        return <div>NotImplemented</div>;
      default:
        break;
    }
  };
  return layoutSwitch();
}
