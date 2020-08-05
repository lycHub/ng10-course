import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import {HeroListComponent} from './hero-list/hero-list.component';
import {FormsModule} from '@angular/forms';
import {HeroesRoutingModule} from './heros-routing.module';



@NgModule({
  declarations: [
    HeroListComponent,
    HeroDetailComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HeroesRoutingModule
  ]
})
export class HeroesModule { }
