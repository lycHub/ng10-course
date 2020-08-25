import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UpdateHeroRoutingModule } from './update-hero-routing.module';
import {UpdateHeroComponent} from './update-hero.component';


@NgModule({
  declarations: [UpdateHeroComponent],
  imports: [
    CommonModule,
    UpdateHeroRoutingModule
  ]
})
export class UpdateHeroModule { }
