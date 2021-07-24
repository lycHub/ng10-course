import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PipeModule} from './pipes/pipe.module';
import {DirectivesModule} from './directives/directives.module';
import {ComponentsModule} from './components/components.module';
import {MobileService} from './components/test-service/mobile/mobile.service';



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
  ],
  // providers: [MobileService]
})
export class DemosModule { }
