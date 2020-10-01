import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  AfterViewInit,
  ElementRef,
  Renderer2,
  ViewChild,
  Input,
  OnChanges,
  SimpleChanges, Output, EventEmitter, Inject, PLATFORM_ID
} from '@angular/core';
import {empty, merge, of, Subscription} from 'rxjs';
import {pluck, switchMap} from 'rxjs/operators';
import {OverlayRef, OverlayService} from '../../services/tools/overlay.service';
import {AbstractControl, FormBuilder, ValidationErrors, Validators} from '@angular/forms';
import {isPlatformBrowser} from '@angular/common';
import {animate, style, transition, trigger, AnimationEvent} from '@angular/animations';
import {UserService} from '../../services/apis/user.service';
import {WindowService} from '../../services/tools/window.service';

@Component({
  selector: 'xm-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('modalAni', [
      transition(':enter', [
        style({
          opacity: 0,
          transform: 'translateY(100%)'
        }),
        animate('.2s', style({
          opacity: 1,
          transform: 'translateY(0)'
        }))
      ]),
      transition(':leave', [
        animate('.3s', style({
          opacity: 0,
          transform: 'translateY(-100%)'
        }))
      ])
    ])
  ]
})
export class LoginComponent implements OnInit, AfterViewInit, OnChanges {
  @Input() show = false;
  @Output() hide = new EventEmitter<void>();
  visible = false;
  remember = true;
  private overlayRef: OverlayRef;
  private overlaySub: Subscription;
  formValues = this.fb.group({
    phone: ['13647008979', [
      Validators.required,
      Validators.pattern(/^1\d{10}$/)
    ]],
    password: ['angular10', [
      Validators.required,
      Validators.minLength(6)
    ]]
  });
  @ViewChild('modalWrap', { static: false }) private modalWrap: ElementRef;
  constructor(
    private overlayServe: OverlayService,
    private fb: FormBuilder,
    @Inject(PLATFORM_ID) private platformId: object,
    private userServe: UserService,
    private winServe: WindowService,
    private rd2: Renderer2) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    // this.showOverlay();
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (this.show) {
      this.create();
    } else {
      this.visible = false;
    }
  }

  submit(): void {
    // console.log('submit', this.formValues.value);
    if (this.formValues.valid) {
      this.userServe.login(this.formValues.value).subscribe(({ user, token }) => {
        alert('登陆成功');
        this.winServe.setStorage('xm-auth', token);
        if (this.remember) {
          this.winServe.setStorage('remember', 'true');
        }
        this.hide.emit();
      }, error => {
        alert(error.error.message || '登陆失败');
      });
    }
  }

  create(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.overlayRef = this.overlayServe.create({ fade: false, center: true, backgroundColor: 'rgba(0,0,0,.32)' });
      // console.log('overlayRef', this.overlayRef);
      this.overlaySub = merge(
        this.overlayRef.backdropClick(),
        this.overlayRef.backdropKeyup().pipe(
          pluck('key'),
          switchMap(key => {
            return key.toUpperCase() === 'ESCAPE' ? of(key) : empty();
          })
        )
      ).subscribe(() => {
        this.hide.emit();
      });
      this.visible = true;
      setTimeout(() => {
        this.rd2.appendChild(this.overlayRef.container, this.modalWrap.nativeElement);
      }, 0);
    }
  }
  animationDone(event: AnimationEvent): void {
    if (event.toState === 'void') {
      if (this.overlaySub) {
        this.overlaySub.unsubscribe();
        this.overlaySub = null;
      }
      if (this.overlayRef) {
        this.overlayRef.dispose();
        this.overlayRef = null;
      }
    }
  }
  get formControls(): {
    [key: string]: {
      control: AbstractControl,
      showErr: boolean,
      errors: ValidationErrors
    }
  } {
    const controls = {
      phone: this.formValues.get('phone'),
      password: this.formValues.get('password')
    }
    return {
      phone: {
        control: controls.phone,
        showErr: controls.phone.touched && controls.phone.invalid,
        errors: controls.phone.errors
      },
      password: {
        control: controls.password,
        showErr: controls.password.touched && controls.password.invalid,
        errors: controls.password.errors
      }
    };
  }
}
