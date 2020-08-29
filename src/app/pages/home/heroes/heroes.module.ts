import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HeroesComponent} from './heroes.component';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import { SpinComponent } from './spin/spin.component';


@NgModule({
  declarations: [HeroesComponent, SpinComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ]
})
export class HeroesModule { }
