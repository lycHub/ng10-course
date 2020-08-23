import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {AbstractControl, FormGroup, NgForm, ValidationErrors, ValidatorFn} from '@angular/forms';
import {HasMobileService} from '../has-mobile.service';

class Profile {
  constructor(
    public firstName: string,
    public lastName: string,
    public mobile: string,
    public password: string,
    public rePassword: string
  ) {}
}

function forbiddenNameValidator(reg: RegExp): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    // console.log('control', control);
    const forbidden = reg.test(control.value);
    return forbidden ? { forbiddenName: { value: '名字不能包含bob' } } : null;
  };
}

function equalValidator(group: FormGroup): ValidationErrors | null {
  const password = group.get('password');
  const rePassword = group.get('rePassword');
  return password.value === rePassword.value ? null : { equal: '两次密码不一样' };
}

@Component({
  selector: 'app-profile-editor',
  templateUrl: './profile-editor.component.html',
  styles: [
    `
        .profile-editor {
            width: 500px;
            margin: 100px auto;
        }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileEditorComponent implements OnInit {
  model = new Profile('a', 'v', '', '', '');

  constructor(private hasMobileServe: HasMobileService) { }

  ngOnInit(): void {
  }


  onSubmit(f: NgForm) {
    console.log('submit value', f.value);
    // console.log('submit valid', f.valid);
  }

  onReset(f: NgForm) {
    f.reset({ firstName: 'aaa', lastName: 'bbb', password: 'ccc' });
  }
}
