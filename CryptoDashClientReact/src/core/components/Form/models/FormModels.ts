export enum ControlType {
    Combo = 1,
    Input = 2,
    Toggle = 3,
}

export type ControlSettings = ComboSettings | InputSettings;

export interface BaseControlSettings {
    isRequired?: boolean;

    isChanged?: boolean;
    isInvalid?: boolean;
}
export interface InputSettings extends BaseControlSettings {

}
export interface ComboSettings extends BaseControlSettings {
    allowMultiple?: boolean;
    items: Item[];
}
export interface FormControl {
    id: string;
    name: string;
    type: ControlType;
    settings: ControlSettings;
    value: unknown;
}

export interface Item {
    id: number;
    name: string;
}

export interface FormValues {
    controlsValue: FormControlDataValue[];
}

export interface FormControlDataValue {
    id: string;
    value: unknown;
}
