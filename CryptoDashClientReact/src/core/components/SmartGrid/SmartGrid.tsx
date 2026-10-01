import type { Grid, Row } from "@/core/share/grid/grid";
import { themeQuartz, type ColDef } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { useState } from "react";

export interface GridProps {
  grid?: Grid;
}

const theme = themeQuartz.withParams({
  backgroundColor: "#1f2836",
  browserColorScheme: "dark",
  chromeBackgroundColor: {
    ref: "foregroundColor",
    mix: 0.07,
    onto: "backgroundColor",
  },
  foregroundColor: "#FFF",
});

export function SmartGrid({ grid }: GridProps) {
  const [rowData, setRowData] = useState<Row[]>(grid?.data ?? []);
  const [colDefs, setColDefs] = useState<ColDef[]>(
    grid?.layout.columns.map((col) => {
      const colDef: ColDef<Row> = {
        headerName: col.name,
        colId: col.id,
        valueGetter: (col) =>
          col.data?.data[col.colDef.colId ? +col.colDef.colId : -1],
      };
      return colDef;
    }) ?? [],
  );
  return (
    <div className="w-full h-full">
      <AgGridReact theme={theme} rowData={rowData} columnDefs={colDefs} />
    </div>
  );
}
