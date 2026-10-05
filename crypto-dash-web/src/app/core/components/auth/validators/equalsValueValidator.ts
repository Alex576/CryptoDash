import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function equalsValueValidator(first: string, second: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {

        const firstControl = control.get(first);
        const secondControl = control.get(second);
        if (!firstControl || !secondControl) {
            return null;
        }

        if (secondControl.errors) {
            return null;
        }

        if (firstControl.value !== secondControl.value) {
            secondControl.setErrors({ passwordMismatch: true });
            return { passwordMismatch: true };
        } else if (secondControl.hasError('passwordMismatch')) {
            secondControl.setErrors(null);
        }
        return null;
    };
}