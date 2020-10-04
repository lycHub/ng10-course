import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Inject,
  PLATFORM_ID,
  Input,
  OnChanges,
  SimpleChanges,
  AfterViewInit, ChangeDetectorRef, OnDestroy, TemplateRef
} from '@angular/core';
import {DOCUMENT, isPlatformBrowser} from '@angular/common';
import {fromEvent, Subscription} from 'rxjs';
import {debounceTime} from 'rxjs/operators';
import {animate, style, transition, trigger} from '@angular/animations';
import {ScrollEl, ScrollService} from '../../../services/tools/scroll.service';


@Component({
  selector: 'xm-back-top',
  templateUrl: './back-top.component.html',
  styleUrls: ['./back-top.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('fadeShow', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('.2s', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('.2s', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class BackTopComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {
  @Input() target: string | HTMLElement;
  @Input() visibleHeight = 450;
  @Input() tpl: TemplateRef<any>;
  private scrollTarget: HTMLElement;
  visible = false;
  scrollHandler: Subscription;
  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    @Inject(DOCUMENT) private doc: Document,
    private cdr: ChangeDetectorRef,
    private scrollServe: ScrollService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    const { target } = changes;
    if (target) {
      this.scrollTarget = typeof target.currentValue === 'string' ? this.doc.querySelector(target.currentValue) : target.currentValue;
    }
  }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.listenScrollEvent();
    }
  }

  clickBackTo(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.scrollServe.scrollTo(this.getTarget());
    }
  }

  private getTarget(): ScrollEl {
    return this.scrollTarget || window;
  }

  private listenScrollEvent(): void {
    this.scrollHandler = fromEvent(this.getTarget(), 'scroll')
      .pipe(debounceTime(200))
      .subscribe(() => {
        const currentScrollValue = this.scrollServe.getScroll(this.getTarget());
        this.visible = currentScrollValue > this.visibleHeight;
        this.cdr.markForCheck();
      });
  }

  ngOnDestroy(): void {
    if (this.scrollHandler) {
      this.scrollHandler.unsubscribe();
    }
  }
}
