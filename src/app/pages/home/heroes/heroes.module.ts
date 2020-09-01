import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HeroesComponent} from './heroes.component';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import { SpinComponent } from './spin/spin.component';
import { AuthDirective } from './auth.directive';


@NgModule({
  declarations: [HeroesComponent, SpinComponent, AuthDirective],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ]
})
export class HeroesModule { }
