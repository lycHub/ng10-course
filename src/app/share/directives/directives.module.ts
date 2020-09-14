import { NgModule } from '@angular/core';
import { StrTplOutletDirective } from './str-tpl-outlet.directive';
import { IconDirective } from './icon/icon.directive';



@NgModule({
  declarations: [StrTplOutletDirective, IconDirective],
  exports: [StrTplOutletDirective, IconDirective]
})
export class DirectivesModule { }
