import {Directive, ElementRef} from '@angular/core';

@Directive({
  selector: '[xmDragHandler]'
})
export class DragHandlerDirective {

  constructor(readonly el: ElementRef) { }

}
