import { Pipe, PipeTransform } from '@angular/core';
import {Hero} from '../types';

@Pipe({
  name: 'flyingHeroesImpure',
  pure: false
})
export class FlyingHeroesImpurePipe implements PipeTransform {
  transform(allHeroes: Hero[]) {
    console.log('transform');
    return allHeroes.filter(hero => hero.canFly);
  }
}
