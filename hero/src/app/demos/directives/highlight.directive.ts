import {Directive, ElementRef, HostListener, Input} from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {
  @Input('appHighlight') highlightColor = 'yellow';
  constructor(private el: ElementRef) {
    console.log(this.el);
    // this.el.nativeElement.style.backgroundColor = 'yellow';
  }
  @HostListener('mouseenter', ['$event']) onMouseEnter(event) {
    // console.log('event', event);
    this.highlight(this.highlightColor);
  }
  @HostListener('mouseleave') onMouseLeave() {
    this.highlight('');
  }

  private highlight(color: string) {
    this.el.nativeElement.style.backgroundColor = color;
  }
}
