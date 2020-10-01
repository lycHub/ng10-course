import {Component, OnInit, ChangeDetectionStrategy, AfterViewInit, ElementRef, Renderer2, ViewChild} from '@angular/core';
import {empty, merge, of, Subscription} from 'rxjs';
import {pluck, switchMap} from 'rxjs/operators';
import {OverlayRef, OverlayService} from '../../services/tools/overlay.service';
import {FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'xm-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit, AfterViewInit {
  private overlayRef: OverlayRef;
  private overlaySub: Subscription;
  formValues = this.fb.group({
    phone: ['', [
      Validators.required,
      Validators.pattern(/^1\d{10}$/)
    ]],
    password: ['', [
      Validators.required,
      Validators.minLength(6)
    ]]
  });
  @ViewChild('modalWrap', { static: true }) private modalWrap: ElementRef;
  constructor(
    private overlayServe: OverlayService,
    private fb: FormBuilder,
    private rd2: Renderer2) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.showOverlay();
  }

  showOverlay(): void {
    this.overlayRef = this.overlayServe.create({ fade: true, center: true, backgroundColor: 'rgba(0,0,0,.32)' });
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
      this.hideOverlay();
    });
    this.rd2.appendChild(this.overlayRef.container, this.modalWrap.nativeElement);
  }

  hideOverlay(): void {
    if (this.overlaySub) {
      this.overlaySub.unsubscribe();
      this.overlaySub = null;
    }
    this.overlayRef.dispose();
    this.overlayRef = null;
  }

}
