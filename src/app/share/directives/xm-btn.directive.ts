import {Directive, HostBinding, Input} from '@angular/core';

@Directive({
  selector: 'a[xmBtn], button[xmBtn]',
  host: {
    '[class.xm-btn]': 'true'
  }
})
export class XmBtnDirective {
  @Input() @HostBinding('class.xm-btn-block') xmBlock = false;
  @Input() @HostBinding('class.xm-btn-circle') xmCircle = false;
  constructor() { }

}
