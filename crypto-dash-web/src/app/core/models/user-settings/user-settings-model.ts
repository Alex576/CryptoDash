import { SettingsCode } from "../settings-code";
import { TileCode } from "../tile-code";
import { ToolCode } from "../tool-code";

export interface UserSettingsModel {
    settingsCode: SettingsCode;
    toolCode?: ToolCode;
    tileCode?: TileCode;
}