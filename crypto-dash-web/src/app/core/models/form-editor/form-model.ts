import { FormControl } from "../controls/form-control";
import { TileCode } from "../tile-code";
import { FormActionCode } from "./form-action";

export interface FormModel {
    controls: FormControl[];
    tileCode: TileCode;
    actions: FormActionCode[];
}