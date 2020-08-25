```typescript
import {
  Component,
  OnInit,
  ChangeDetectionStrategy
} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-add-hero',
  templateUrl: './add-hero.component.html',
  styleUrls: ['./add-hero.component.scss'],
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
        Validators.minLength(2),
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
      brief: this.formValues.get('brief'),
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

  }

  cancel() {

  }
}

```

```angular2html
<div class="add-hero">
  <form [formGroup]="formValues" (ngSubmit)="onSubmit()">
    <div class="form-group">
      <label for="heroName">姓名：</label>
      <!--   输入框上加了is-invalid，边框会变红，并且.invalid-feedback会显示出来   -->
      <input
        class="form-control"
        id="heroName"
        name="name"
        maxlength="20"
        formControlName="name"
        placeholder="请输入姓名" />
    </div>
    <div class="form-group">
      <label>姓别：</label>
      <input
        type="radio"
        name="gender"
        formControlName="gender"
        value="0" />男
      <input
        type="radio"
        name="gender"
        formControlName="gender"
        value="1" />女
      <input
        type="radio"
        name="gender"
        formControlName="gender"
        value="2" />其它
    </div>
    <div class="form-group">
      <label for="heroAge">年龄：</label>
      <input
        class="form-control"
        id="heroAge"
        name="age"
        formControlName="age"
        placeholder="请输入年龄"
        type="number"
        min="0" />
    </div>
    <div class="form-group">
      <label for="heroPhone">手机号：</label>
      <input
        class="form-control"
        id="heroPhone"
        formControlName="phone"
        name="phone"
        placeholder="请输入手机号" />
    </div>
    <div class="form-group">
      <label for="heroEmail">Email address</label>
      <input
        class="form-control"
        type="email"
        name="email"
        formControlName="email"
        id="heroEmail"
        placeholder="请输入邮箱" />
    </div>
    <div class="form-group">
      <label for="heroJob">职业：</label>
      <select
        class="form-control"
        id="heroJob"
        name="job"
        formControlName="job">
        <option value="">请选择职业</option>
        <option value="0">法师</option>
        <option value="1">战士</option>
        <option value="2">刺客</option>
        <option value="3">射手</option>
        <option value="4">坦克</option>
      </select>
    </div>
    <div class="form-group">
      <label for="heroRole">角色：</label>
      <select
        class="form-control"
        id="heroRole"
        name="role"
        formControlName="role">
        <option value="admin">管理员</option>
        <option value="user">用户</option>
      </select>
    </div>
    <div class="form-group">
      <label for="heroBrief">简介：</label>
      <textarea
        class="form-control"
        id="heroBrief"
        rows="3"
        formControlName="brief"
        maxlength="100"
        name="brief">
      </textarea>
    </div>
    <div class="form-group btns">
      <button class="btn btn-secondary" type="button" (click)="cancel()">取消</button>
      <button class="btn btn-primary" type="submit" [disabled]="!formValues.valid">提交</button>
    </div>
  </form>
</div>
```

```scss
.add-hero {
  form {
    max-width: 900px;
    margin: 20px auto;
    .btns {
      text-align: center;
      margin-top: 16px;
      .btn {
        margin-right: 10px;
      }
    }
  }

}
```

types.ts
```typescript
export interface Base<T> {
  code: number;
  message: string;
  data?: T;
}
export interface Hero {
  id: string;
  name: string;
  phone: number;
  createTime: number;
  gender: string;
  genderText: string;
  job: string;
  jobText: string;
  role: string;
  age?: number;
  email?: string;
  brief?: string;
}

interface LoginType {
  user: Hero;
  token: string;
}

export interface LoginArg {
  name: string;
  password: string;
}

```
