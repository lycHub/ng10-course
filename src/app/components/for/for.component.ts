import { Component, OnInit } from '@angular/core';
import Heros from '../../configs/hero';

interface Hero {
  id: string;
  name: string;
}

@Component({
  selector: 'app-for',
  templateUrl: './for.component.html',
  styles: [`
      .even {
          color: #82fa54;
      }

      .odd {
          color: #fa6993;
      }
  `]
})
export class ForComponent {
  value = '';
  heros: Hero[] = Heros;
  constructor() { }

  add() {
    this.heros.push({
      id: 'hero_' + Date.now(),
      name: this.value
    });
  }
  reset() {
    this.heros = [
      {
        id: 'hero_4',
        name: '盖伦4'
      },
      {
        id: 'hero_5',
        name: '赵信5'
      },
      {
        id: 'hero_2',
        name: '嘉文'
      },
      {
        id: 'hero_6',
        name: '易大师6'
      },
      {
        id: 'hero_7',
        name: '泰达米尔7'
      }
    ];
  }

  trackByHero(hero: Hero): string {
    return hero.id;
  }
}
