import { TileCode } from "../tile-code";
import { SidePanelType } from "./side-panel-type";

export interface SidePanelData<D = unknown> {
    tileCode: TileCode;
    type: SidePanelType;
    data: D;
}