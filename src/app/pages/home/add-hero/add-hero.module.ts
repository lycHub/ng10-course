import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddHeroRoutingModule } from './add-hero-routing.module';
import {ReactiveFormsModule} from '@angular/forms';
// import {CoreModule} from '../../../services/core.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AddHeroRoutingModule,
    // CoreModule
  ]
})
export class AddHeroModule { }
