import { Component, OnInit } from '@angular/core';
import {Hero} from '../../types';
import {HEROES} from '../../hero';

@Component({
  selector: 'app-pipe',
  templateUrl: './pipe.component.html',
  styles: [
  ]
})
export class PipeComponent implements OnInit {
  object: {[key: number]: string} = {2: 'foo', 1: 'bar'};
  map = new Map([[2, 'foo'], [1, 'bar']]);
  power = 5;
  factor = 1;

  heroes: Hero[] = [];
  canFly = true;
  constructor() {
    this.reset();
  }

  ngOnInit(): void {}
  addHero(name: string) {
    name = name.trim();
    if (name) {
      // 不改变引用没有用
      this.heroes.push({ id: 'flier_' + Date.now(), name, canFly: this.canFly });

      /*this.heroes = [
        ...this.heroes,
        { id: 'flier_' + Date.now(), name, canFly: this.canFly }
      ];*/
    }
  }

  reset() { this.heroes = HEROES.slice(); }

}
