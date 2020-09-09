import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import {HomeComponent} from './home.component';
import {HeroesModule} from './heroes/heroes.module';
import { AddUpdateHeroComponent } from './add-update-hero/add-update-hero.component';
import {ReactiveFormsModule} from '@angular/forms';
// import {ServiceModule} from '../../services/service.module';

@NgModule({
  declarations: [HomeComponent, AddUpdateHeroComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HomeRoutingModule,
    HeroesModule,
    // ServiceModule
  ]
})
export class HomeModule { }
