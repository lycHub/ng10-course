import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HighlightDirective} from './highlight.directive';
import {UnlessDirective} from './unless.directive';



@NgModule({
  declarations: [
    HighlightDirective,
    UnlessDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    HighlightDirective,
    UnlessDirective
  ]
})
export class DirectivesModule { }
