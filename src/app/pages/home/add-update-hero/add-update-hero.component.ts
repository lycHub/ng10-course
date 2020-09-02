import {Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {HeroService} from '../../../services/hero.service';
import {WindowService} from '../../../services/window.service';
import {LogService} from '../../../services/log.service';

@Component({
  selector: 'app-add-update-hero',
  templateUrl: './add-update-hero.component.html',
  styles: [
    `
          .add-update-hero form {
              max-width: 900px;
              margin: 20px auto;
          }
          .add-update-hero form .btns {
              text-align: center;
              margin-top: 16px;
          }
          .add-update-hero form .btn {
              margin-right: 10px;
          }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddUpdateHeroComponent implements OnInit {
  formValues: FormGroup = this.fb.group({
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
  private submitted = false;
  private id = '';
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private heroServe: HeroService,
    private windowServe: WindowService,
    private cdr: ChangeDetectorRef,
    private LogServe: LogService
  ) {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.getHeroInfo();
    }
  }

  ngOnInit(): void {}

  onSubmit() {
    this.submitted = true;
    if (this.formValues.valid) {
      if (this.id) {
        this.heroServe.updateHero(this.id, this.formValues.value).subscribe(() => {
          this.windowServe.alert('修改成功');
          this.cancel();
        });
      } else {
        this.heroServe.addHero(this.formValues.value).subscribe(() => {
          this.windowServe.alert('新增成功');
          this.cancel();
        });
      }
    }
  }

  getHeroInfo() {
    this.heroServe.hero(this.id).subscribe(hero => {
      // console.log('hero', hero);
      this.formValues.patchValue(hero);
      this.cdr.markForCheck();
    });
  }

  cancel() {
    this.router.navigate(['../heroes'], { relativeTo: this.route });
  }

  canDeactivate() {
    if (this.formValues.dirty && !this.submitted) {
      return confirm('表单未保存，确定离开？');
    }
    return true;
  }

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
}
