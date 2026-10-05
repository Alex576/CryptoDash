import { ControlSettings } from "./control-settings";
import { ControlType } from "./control-type";

export interface FormControl<TSettings = ControlSettings, TValue = unknown> {
    id: string;
    name: string;
    type: ControlType;
    value: TValue;
    settings: TSettings;
    tileItemCode: number; //todo mb add TileItemCode entity?
    updated?: boolean;
}