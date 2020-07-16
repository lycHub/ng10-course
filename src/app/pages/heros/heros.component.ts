import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Hero, HeroArg} from '../../configs/types';
import { HeroService } from '../../services/hero.service';

@Component({
  selector: 'app-heros',
  templateUrl: './heros.component.html',
  styleUrls: ['./heros.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [HeroService]
})
export class HerosComponent implements OnInit {
  searchParams: HeroArg = {
    name: '',
    job: '',
    sort: 'desc'
  };
  heros: Hero[];
  // heroServe: HeroService;
  constructor(readonly heroServe: HeroService) {
    // this.heroServe = new HeroService();
    this.heros = this.heroServe.getHeros();
    // console.log(this.heroServe.getHeros());
  }

  ngOnInit(): void {
  }

  search() {
    console.log(this.searchParams);
  }
}
