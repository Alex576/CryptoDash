import { FormControl } from "./form-control";

export interface FormControlValue {
    id: string;
    value: unknown;
    updated: boolean;
}

export function getFormControlValues(controls: FormControl[]): FormControlValue[] {
    return controls.map((control) => ({ id: control.id, value: control.value, updated: control.updated }));
}