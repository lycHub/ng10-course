import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageComponent } from './message.component';
import {DirectivesModule} from '../../directives/directives.module';
import { MessageItemComponent } from './message-item/message-item.component';



@NgModule({
  declarations: [MessageComponent, MessageItemComponent],
  imports: [
    CommonModule,
    DirectivesModule
  ]
})
export class MessageModule { }
