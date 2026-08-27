import {
  useGetFiltersQuery,
  useGetLayoutQuery,
} from "@/core/features/settings/settingsApiSlice";
import type { ToolCode } from "@/core/share/tool-code";
import { useState } from "react";
import { ControlSwitch } from "../controls/components";
import { Loading } from "../Loading/Loading";

export interface SettingsProps {
  // toolCode: ToolCode;
}

export function Settings({}: SettingsProps) {
  const [toolCode, setToolCode] = useState<ToolCode | undefined>();
  const {
    data: filters,
    isLoading: isLoadingFilters,
    isError: isFiltersError,
  } = useGetFiltersQuery({ toolCode });
  const {
    data: layout,
    isLoading: isLoadingLayout,
    isError: isLayoutError,
  } = useGetLayoutQuery({ toolCode: toolCode! }, { skip: !!toolCode });

  if (isLoadingFilters || isLoadingLayout) return <Loading />;
  if (isFiltersError || isLayoutError || !filters) return <div>Error</div>;
  return (
    <div>
      <ControlSwitch control={filters.toolFilter} />
    </div>
  );
}
