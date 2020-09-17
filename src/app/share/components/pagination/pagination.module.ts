import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from './pagination.component';
import {DirectivesModule} from '../../directives/directives.module';



@NgModule({
  declarations: [PaginationComponent],
  imports: [
    CommonModule,
    DirectivesModule
  ],
  exports: [PaginationComponent]
})
export class PaginationModule { }
