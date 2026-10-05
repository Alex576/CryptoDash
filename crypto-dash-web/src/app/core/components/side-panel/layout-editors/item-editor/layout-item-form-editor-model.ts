import { FormValues } from "../../../../models/form-editor/form-values";
import { TileCode } from "../../../../models/tile-code";

export interface LayoutItemFormEditorModel {
    formValues?: FormValues;
    itemId: string;
    tileCode: TileCode;
}