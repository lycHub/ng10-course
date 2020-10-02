import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageComponent } from './message.component';
import {DirectivesModule} from '../../directives/directives.module';
import {PipesModule} from '../../pipes/pipes.module';



@NgModule({
  declarations: [MessageComponent],
  imports: [
    CommonModule,
    DirectivesModule,
    PipesModule
  ],
  exports: [MessageComponent]
})
export class MessageModule { }
