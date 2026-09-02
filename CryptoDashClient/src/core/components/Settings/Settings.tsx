import {
  useGetFiltersQuery,
  useGetLayoutQuery,
} from "@/core/features/settings/settingsApiSlice";
import { Constant } from "@/core/share/constants";
import type { ToolCode } from "@/core/share/tool-code";
import { useState } from "react";
import { ControlSwitch } from "../controls/components";
import type { FormControl } from "../Form/models/FormModels";
import { Loading } from "../Loading/Loading";
import { SettingsLayoutSwitch } from "./components/SettingsLayoutSwitch";

export function Settings() {
  const [toolCode, setToolCode] = useState<ToolCode | undefined>();
  const {
    data: filters,
    isLoading: isLoadingFilters,
    isError: isFiltersError,
  } = useGetFiltersQuery({});
  const {
    data: layout,
    isLoading: isLoadingLayout,
    isError: isLayoutError,
  } = useGetLayoutQuery({ toolCode: toolCode! }, { skip: !toolCode });

  const handleFilterValueChange = (control: FormControl, newValue: unknown) => {
    if (control.id === Constant.TOOL_FILTER_ID) {
      setToolCode(newValue as number);
    }
  };
  if (isLoadingFilters || isLoadingLayout) return <Loading />;
  if (isFiltersError || isLayoutError || !filters) return <div>Error</div>;
  return (
    <div className="flex flex-col h-full">
      <ControlSwitch
        control={filters.toolFilter}
        onControlValueChanged={handleFilterValueChange}
      />
      {layout?.items.map((item) => {
        return <SettingsLayoutSwitch key={item.type} element={item} />;
      })}
    </div>
  );
}
