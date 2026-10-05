import { ControlType } from "../../../models/controls/control-type";
import { FormControl } from "../../../models/controls/form-control";
import { TileCode } from "../../../models/tile-code";
import { PinPosition } from "../../ag-grid/models/column";
import { ColumnDataType } from "../../ag-grid/models/column-data-type";
import { Grid } from "../../ag-grid/models/grid";
import { DashboardLayout } from "../../dashboard-panel/models/dashboard-layout";
import { TileTypeCode } from "./tile-type-code";


export interface ColumnEntity {
    name: string;
    columnId: string;
    width?: number;
    editable: boolean;
    pinned: PinPosition;
    lockPinned: boolean;
    autoHeight: boolean;
    wrapText: boolean;
    sortable: boolean;
    maxWidth?: number;
    resizable: boolean;
    columnDataType: ColumnDataType;

}

export type LayoutItemEntity = FilterLayoutEntity | GridLayoutEntity | DashboardLayoutEntity | FormLayoutEntity;

export interface LayoutEntity {
    tileCode: TileCode;
    tileType: TileTypeCode;
    data: LayoutItemEntity;
}

export interface DashboardLayoutEntity extends LayoutEntityBase {
    // tileType: TileTypeCode.Dashboard;
    dashboardLayout: DashboardLayout;
}
export interface GridLayoutEntity extends LayoutEntityBase {
    // tileType: TileTypeCode.Grid;
    gridEditor: GridEditorEntity;
}

export interface FormLayoutEntity extends LayoutEntityBase {
    // tileType: TileTypeCode.Form;
    controls: FormEditorControlEntity[];
}

export interface FilterLayoutEntity extends LayoutEntityBase {
    // tileType: TileTypeCode.Filter;
    filters: FormControl[];
}

export interface GridEditorEntity {
    gridEntity: Grid;
}

export interface FormEditorControlEntity {
    name: string;
    type: ControlType;
    tileItemCode: number;
}

export interface LayoutEntityBase {
    tileCode: TileCode;
}