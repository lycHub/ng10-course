import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HeroesComponent} from './heroes.component';
import {FormsModule} from '@angular/forms';


@NgModule({
  declarations: [HeroesComponent],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class HeroesModule { }
