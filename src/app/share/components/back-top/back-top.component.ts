import {Component, OnInit, ChangeDetectionStrategy, Inject, PLATFORM_ID, Input, OnChanges, SimpleChanges} from '@angular/core';
import {DOCUMENT, isPlatformBrowser} from '@angular/common';


export type EasyingFn = (t: number, b: number, c: number, d: number) => number;
export type ScrollEl = HTMLElement | Window;

function easeInOutCubic(t: number, b: number, c: number, d: number): number {
  const cc = c - b;
  let tt = t / (d / 2);
  if (tt < 1) {
    return (cc / 2) * tt * tt * tt + b;
  } else {
    return (cc / 2) * ((tt -= 2) * tt * tt + 2) + b;
  }
}


@Component({
  selector: 'xm-back-top',
  templateUrl: './back-top.component.html',
  styleUrls: ['./back-top.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BackTopComponent implements OnInit, OnChanges {
  @Input() target: string | HTMLElement;
  private scrollTarget: HTMLElement;
  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    @Inject(DOCUMENT) private doc: Document
  ) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { target } = changes;
    if (target) {
      const tempTarget = typeof target.currentValue === 'string' ? this.doc.querySelector(target.currentValue) : target.currentValue;
      this.scrollTarget = tempTarget || window;
    }
  }

  ngOnInit(): void {
  }

  clickBackTo(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.scrollTo(this.scrollTarget);
    }
  }

  private scrollTo(container: ScrollEl, targetTop = 0, easing?: EasyingFn, callback?: () => void): void {
    const target = container || window;
    const scrollTop = this.getScroll(target);
    // console.log('scrollTop', scrollTop);
    const startTime = Date.now();
    const frameFunc = () => {
      const duration = Date.now() - startTime;
      const topValue = (easing || easeInOutCubic)(duration, scrollTop, targetTop, 450);
      this.setScrollTop(container, topValue);
      if (duration < 450) {
        requestAnimationFrame(frameFunc);
      } else {
        if (callback) {
          callback();
        }
      }
    }
    requestAnimationFrame(frameFunc);
  }

  private setScrollTop(el: ScrollEl, topValue = 0): void {
    if (el === window) {
      this.doc.body.scrollTop = topValue;
      this.doc.documentElement.scrollTop = topValue;
    } else {
      (el as HTMLElement).scrollTop = topValue;
    }
  }

  private getScroll(el: ScrollEl, top = true): number {
    const prop = top ? 'pageYOffset' : 'pageXOffset'; // window
    const method = top ? 'scrollTop' : 'scrollLeft'; // dom
    return el === window ? el[prop] : el[method];
  }
}
