import { AbstractControl, ValidationErrors } from "@angular/forms";

export function emailValidator(control: AbstractControl): ValidationErrors | null {

  const valid = (control.value as string).endsWith('@wilder.school');

  const errors = {
    email: {
      rules: 'needs to be a wilder.school email'
    }
  };

  return !valid ? errors : null;
}
