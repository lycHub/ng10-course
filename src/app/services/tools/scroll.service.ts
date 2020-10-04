import {Inject, Injectable} from '@angular/core';
import {DOCUMENT} from '@angular/common';

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


@Injectable({
  providedIn: 'root'
})
export class ScrollService {

  constructor(@Inject(DOCUMENT) private doc: Document) { }

  scrollTo(container: ScrollEl, targetTop = 0, easing?: EasyingFn, callback?: () => void): void {
    const target = container || window;
    const scrollTop = this.getScroll(target);
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

  getScroll(el: ScrollEl, top = true): number {
    const prop = top ? 'pageYOffset' : 'pageXOffset'; // window
    const method = top ? 'scrollTop' : 'scrollLeft'; // dom
    return el === window ? el[prop] : el[method];
  }
}
