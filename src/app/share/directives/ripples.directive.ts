import {Directive, HostBinding, HostListener, Renderer2} from '@angular/core';

@Directive({
  selector: '[xmRipples]'
})
export class RipplesDirective {

  constructor(private rd2: Renderer2) { }
  @HostBinding('style.position') readonly position = 'relative';
  @HostBinding('style.overflow') readonly overflow = 'hidden';
  @HostListener('click', ['$event'])
  click(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    const { left, top } = target.getBoundingClientRect();
    const x = event.clientX - left;
    const y = event.clientY - top;
    const ripple = this.rd2.createElement('span');
    this.rd2.addClass(ripple, 'xm-ripples');
    this.rd2.setStyle(ripple, 'left', x + 'px');
    this.rd2.setStyle(ripple, 'top', y + 'px');
    this.rd2.appendChild(target, ripple);
    this.rd2.listen(ripple, 'animationend', () => {
      this.rd2.removeChild(target, ripple);
    });
  }

}
