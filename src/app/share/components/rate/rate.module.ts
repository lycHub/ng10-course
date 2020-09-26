import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RateItemComponent} from './rate-item/rate-item.component';
import {DirectivesModule} from '../../directives/directives.module';
import { RateComponent } from './rate.component';



@NgModule({
  declarations: [RateItemComponent, RateComponent],
  imports: [
    CommonModule,
    DirectivesModule
  ],
  exports: [RateComponent]
})
export class RateModule { }
