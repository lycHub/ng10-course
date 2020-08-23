import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import {HasMobileService} from '../has-mobile.service';

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
  /*profileForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    address: new FormGroup({
      street: new FormControl(''),
      city: new FormControl(''),
      state: new FormControl(''),
      zip: new FormControl('')
    })
  });*/
  profileForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', [
      Validators.required,
      Validators.minLength(4),
      forbiddenNameValidator(/bob/i)
    ]],
    /*mobile: ['', [
      Validators.required,
      Validators.pattern(/^\d{11}$/)
    ], this.hasMobileServe.validate],*/
    mobile: ['', {
      validators: [
        Validators.required,
        Validators.pattern(/^\d{11}$/)
      ],
      asyncValidators: this.hasMobileServe.validate,
      updateOn: 'blur'
    }],
    newPass: this.fb.group({
      password: ['', Validators.required],
      rePassword: ['', Validators.required],
    }, { validators: equalValidator })
  });
  get firstName() { return this.profileForm.get('firstName'); }
  get lastName() { return this.profileForm.get('lastName'); }
  get newPass() { return this.profileForm.get('newPass'); }
  get mobile() { return this.profileForm.get('mobile'); }


  constructor(private fb: FormBuilder, private hasMobileServe: HasMobileService) { }

  ngOnInit(): void {
  }


  onSubmit() {
    console.log('onSubmit', this.profileForm.value);
    console.log('lastName', this.profileForm.get('lastName').value);
  }
}
