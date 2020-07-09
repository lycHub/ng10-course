import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Hero, HeroArg} from '../../configs/types';
import Heros from '../../configs/hero';

@Component({
  selector: 'app-heros',
  templateUrl: './heros.component.html',
  styleUrls: ['./heros.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HerosComponent implements OnInit {
  searchParams: HeroArg = {
    name: '',
    job: '',
    sort: 'desc'
  };
  heros: Hero[] = Heros;
  constructor() {
    console.log(this.heros);
  }

  ngOnInit(): void {
  }

  search() {
    console.log(this.searchParams);
  }
}
