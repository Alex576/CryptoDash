import {
  TileTypeCode,
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
      case TileTypeCode.Form:
        return <FormPreview data={element.data as SettingsFormData} />;
      case TileTypeCode.Filter:
        return <div>NotImplemented</div>;
      case TileTypeCode.Table:
        return <div>NotImplemented</div>;
      case TileTypeCode.Dashboard:
        return <DashboardPreview data={element.data as DashboardPreviewData} />;
      case TileTypeCode.DashboardItem:
        return <div>NotImplemented</div>;
      default:
        break;
    }
  };
  return layoutSwitch();
}
