import { ControlType } from "../controls/control-type";
import { FormValues } from "../form-editor/form-values";
import { TileCode } from "../tile-code";

export interface FullScreenFormModel {
    formValueModel?: FormValues;
    tileCode: TileCode;
    controls?: ControlPreviewModel[];
    selectedControl?: string;
}

export interface ControlPreviewModel {
    id: string;
    type: ControlType;
}