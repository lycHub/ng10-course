import { NgModule } from '@angular/core';
import { StrTplOutletDirective } from './str-tpl-outlet.directive';
import { IconDirective } from './icon/icon.directive';
import { XmBtnDirective } from './xm-btn.directive';
import { ToggleMoreDirective } from './toggle-more.directive';
import {DragModule} from './drag/drag.module';
import { ImgLazyDirective } from './img-lazy.directive';
import { RipplesDirective } from './ripples.directive';



@NgModule({
  declarations: [StrTplOutletDirective, IconDirective, XmBtnDirective, ToggleMoreDirective, ImgLazyDirective, RipplesDirective],
  imports: [DragModule],
  exports: [DragModule, StrTplOutletDirective, IconDirective, XmBtnDirective, ToggleMoreDirective, ImgLazyDirective, RipplesDirective]
})
export class DirectivesModule { }
