import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import {HomeComponent} from './home.component';
import {HeroesModule} from './heroes/heroes.module';
import { AddHeroComponent } from './add-hero/add-hero.component';
import { UpdateHeroComponent } from './update-hero/update-hero.component';


@NgModule({
  declarations: [HomeComponent, AddHeroComponent, UpdateHeroComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    HeroesModule
  ]
})
export class HomeModule { }
