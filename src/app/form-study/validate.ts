import {AbstractControl, FormGroup, ValidationErrors, ValidatorFn} from '@angular/forms';

export function forbiddenNameValidator(reg: RegExp): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    // console.log('control', control);
    const forbidden = reg.test(control.value);
    return forbidden ? { forbiddenName: { value: '名字不能包含bob' } } : null;
  };
}

export function equalValidator(ctrl: AbstractControl): ValidationErrors | null {
  const password = ctrl.get('password');
  const rePassword = ctrl.get('rePassword');
  return password?.value === rePassword?.value ? null : { equal: '两次密码不一样' };
}
