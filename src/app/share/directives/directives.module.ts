import { NgModule } from '@angular/core';
import { StrTplOutletDirective } from './str-tpl-outlet.directive';
import { IconDirective } from './icon/icon.directive';
import { XmBtnDirective } from './xm-btn.directive';



@NgModule({
  declarations: [StrTplOutletDirective, IconDirective, XmBtnDirective],
  exports: [StrTplOutletDirective, IconDirective, XmBtnDirective]
})
export class DirectivesModule { }
