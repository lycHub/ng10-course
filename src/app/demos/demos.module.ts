import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PipeModule} from './pipes/pipe.module';
import {DirectivesModule} from './directives/directives.module';
import {ComponentsModule} from './components/components.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PipeModule,
    DirectivesModule,
    ComponentsModule
  ],
  exports: [
    PipeModule,
    DirectivesModule,
    ComponentsModule
  ]
})
export class DemosModule { }
