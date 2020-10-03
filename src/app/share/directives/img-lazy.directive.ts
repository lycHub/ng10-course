import {AfterViewInit, Directive, ElementRef, HostBinding, Input, OnDestroy, Renderer2} from '@angular/core';

@Directive({
  selector: '[xmImgLazy]'
})
export class ImgLazyDirective implements AfterViewInit, OnDestroy {
  @Input('xmImgLazy') src = '';
  @HostBinding('attr.src') readonly defSrc = '../../../assets/images/default-pic.jpg';
  private io: IntersectionObserver;
  private changeTimes = 0;
  private host: HTMLElement;
  constructor(private el: ElementRef, private rd2: Renderer2) { }

  ngAfterViewInit(): void {
    this.host = this.el.nativeElement;
    this.io = new IntersectionObserver(entries => {
      // console.log('entries', entries);
      const ratio = entries[0].intersectionRatio;
      if (ratio > 0 && this.changeTimes === 0) {
        this.changeSrc();
      }
    });
    this.io.observe(this.host);
  }

  private changeSrc(): void {
    this.changeTimes++;
    const img = new Image();
    img.src = this.src;
    this.rd2.listen(img, 'load', () => {
      this.rd2.setProperty(this.host, 'src', this.src);
    });
  }

  ngOnDestroy(): void {
    this.io.unobserve(this.host);
  }
}
