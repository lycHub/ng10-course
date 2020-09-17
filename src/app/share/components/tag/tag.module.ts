import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TagComponent} from './tag.component';
import {DirectivesModule} from '../../directives/directives.module';



@NgModule({
  declarations: [TagComponent],
  imports: [DirectivesModule, CommonModule],
  exports: [TagComponent]
})
export class TagModule { }
