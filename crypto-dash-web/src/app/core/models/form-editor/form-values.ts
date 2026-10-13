import { FormControl } from "../controls/form-control";
import { FormControlValue } from "../controls/form-control-value";

export function getFormValues(controls: FormControl[]): FormValues {
    const model: FormValues = new FormValues();
    for (let i = 0; i < controls.length; i++) {
        const control = controls[i];
        model.controls.push({ id: control.id, value: control.value, updated: control.updated });
    }
    return model;
}
export class FormValues {
    controls: FormControlValue[] = [];

    constructor(

    ) { }
}