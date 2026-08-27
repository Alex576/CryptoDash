import type { ToolCode } from "@/core/share/tool-code";
import { useTranslation } from "react-i18next";
import { Chart } from "../Chart/Chart";
import {
  DashboardItemType,
  type DashboardItemOptions,
} from "../models/DashboardModels";
import { Table } from "../Table/Table";

export interface DashboardItem {
  id: string;
  options: DashboardItemOptions;
}

export interface DashboardItemProps {
  id: number;
  tool: ToolCode;
  type: DashboardItemType;
}

export function DashboardItem({ type, ...props }: DashboardItemProps) {
  const { t } = useTranslation();

  const dashboardSwitch = () => {
    switch (type) {
      case DashboardItemType.Chart:
        return <Chart {...props} />;
      case DashboardItemType.Table:
        return <Table />;
      default:
        return <div>{t("Error.NotFoundSwitchCase", { type: type })}</div>;
    }
  };
  return <div className="h-full w-full">{dashboardSwitch()}</div>;
}
