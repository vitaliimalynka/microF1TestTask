import { AbstractControl, ValidatorFn } from "@angular/forms";

export function phoneValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    if (!control.value) {
      return null;
    }

    let value = control.value.replace(/\D/g, '');
    if (value.length > 9) {
      value = value.slice(0, 9);
    }
    const valid = /^[0-9]{9}$/.test(value);
    return valid ? null : { invalidPhone: true };
  };
}