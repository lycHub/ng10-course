import {Directive, Input, OnChanges, SimpleChanges, TemplateRef, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[xmStrTplOutlet]'
})
export class StrTplOutletDirective implements OnChanges {
  @Input() xmStrTplOutlet: TemplateRef<any> | string;
  @Input() xmStrTplOutletContext: any;
  constructor(private viewContainer: ViewContainerRef, private templateRef: TemplateRef<any>) { }
  ngOnChanges(changes: SimpleChanges): void {
    const { xmStrTplOutlet } = changes;
    if (xmStrTplOutlet) {
      this.viewContainer.clear();
      const template = (this.xmStrTplOutlet instanceof TemplateRef) ? this.xmStrTplOutlet : this.templateRef;
      this.viewContainer.createEmbeddedView(template, this.xmStrTplOutletContext);
    }
  }
}
