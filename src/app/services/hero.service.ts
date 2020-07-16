import { Injectable } from '@angular/core';
import Heros from '../configs/hero';

@Injectable()
export class HeroService {
  constructor() { }
  getHeros() {
    return Heros;
  }
}
