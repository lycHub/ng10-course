import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDirective } from './drag.directive';
import { DragHandlerDirective } from './drag-handler.directive';



@NgModule({
  declarations: [DragDirective, DragHandlerDirective],
  imports: [
    CommonModule
  ],
  exports: [DragDirective, DragHandlerDirective]
})
export class DragModule { }
