import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ExponentialStrengthPipe} from './exponential-strength.pipe';
import {FlyingHeroesImpurePipe} from './flying-heroes-impure.pipe';



@NgModule({
  declarations: [
    ExponentialStrengthPipe,
    FlyingHeroesImpurePipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ExponentialStrengthPipe,
    FlyingHeroesImpurePipe
  ]
})
export class PipeModule { }
