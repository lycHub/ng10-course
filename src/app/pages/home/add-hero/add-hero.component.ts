import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-add-hero',
  templateUrl: './add-hero.component.html',
  styles: [
    `
          .add-hero form {
              max-width: 900px;
              margin: 20px auto;
          }
          .add-hero form .btns {
              text-align: center;
              margin-top: 16px;
          }
          .add-hero form .btn {
              margin-right: 10px;
          }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddHeroComponent implements OnInit {
  formValues: FormGroup;
  constructor(private fb: FormBuilder) {
    this.formValues = this.fb.group({
      name: ['', [
        Validators.required,
        Validators.maxLength(20)
      ]],
      gender: ['0', Validators.min(0)],
      age: ['', Validators.min(0)],
      phone: ['', [
        Validators.required,
        Validators.pattern(/^1\d{10}$/)
      ]],
      email: ['', Validators.email],
      job: ['', Validators.required],
      role: ['user', Validators.required],
      brief: ['', [
        Validators.minLength(8),
        Validators.maxLength(100)
      ]]
    });
  }

  ngOnInit(): void {}
  get formControls() {
    const controls = {
      name: this.formValues.get('name'),
      age: this.formValues.get('age'),
      phone: this.formValues.get('phone'),
      email: this.formValues.get('email'),
      job: this.formValues.get('job'),
      role: this.formValues.get('role'),
      brief: this.formValues.get('brief')
    }
    return {
      name: {
        control: controls.name,
        showErr: controls.name.touched && controls.name.invalid,
        errors: controls.name.errors
      },
      age: {
        control: controls.age,
        showErr: controls.age.touched && controls.age.invalid,
        errors: controls.age.errors
      },
      phone: {
        control: controls.phone,
        showErr: controls.phone.touched && controls.phone.invalid,
        errors: controls.phone.errors
      },
      email: {
        control: controls.email,
        showErr: controls.email.touched && controls.email.invalid,
        errors: controls.email.errors
      },
      job: {
        control: controls.job,
        showErr: controls.job.touched && controls.job.invalid,
        errors: controls.job.errors
      },
      role: {
        control: controls.role,
        showErr: controls.role.touched && controls.role.invalid,
        errors: controls.role.errors
      },
      brief: {
        control: controls.brief,
        showErr: controls.brief.touched && controls.brief.invalid,
        errors: controls.brief.errors
      },
    };
  }

  onSubmit() {
    console.log(this.formValues.value);
  }

  cancel() {

  }

}
