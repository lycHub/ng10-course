```typescript
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  NgForm,
  ValidationErrors,
  ValidatorFn,
  Validators
} from '@angular/forms';
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
  model = new Profile('a', 'b', '', '', '');
  constructor(private fb: FormBuilder, private hasMobileServe: HasMobileService) { }

  ngOnInit(): void {
  }


  onSubmit(f: NgForm) {
    console.log('valid', f.valid);
    console.log('value', f.value);
  }
  onReset(f: NgForm) {
    f.reset({ firstName: 'cc', lastName: 'dd' });
  }
}

```

```angular2html
<div class="profile-editor">
  <form #profileForm="ngForm" (ngSubmit)="onSubmit(profileForm)">
    <div>
      <label>
        First Name:
        <input class="form-control" required [(ngModel)]="model.firstName" name="firstName" />
      </label>
    </div>
    <div>
      <label>
        Last Name:
        <input class="form-control" required minlength="4" [(ngModel)]="model.lastName" name="lastName" />
      </label>
    </div>
    <div>
      <label>
        mobile:
        <input
          class="form-control"
          type="tel"
          required
          pattern="\d{11}"
          [(ngModel)]="model.mobile"
          name="mobile" />
      </label>
    </div>
    <div>
      <div>
        <label>
          password:
          <input class="form-control" required [(ngModel)]="model.password" name="password" />
        </label>
      </div>
      <div>
        <label>
          rePassword:
          <input class="form-control" [(ngModel)]="model.rePassword" name="rePassword" />
        </label>
      </div>
    </div>
    <button class="btn btn-primary" type="submit">提交</button>
    <button class="btn btn-secondary ml-2" type="button" (click)="onReset(profileForm)">reset</button>
  </form>
</div>

```
