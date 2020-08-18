import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Hero, HeroArg} from '../../../configs/types';
import {HeroService} from '../../../services/hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [HeroService]
})
export class HeroesComponent implements OnInit {
  searchParams: HeroArg = {
    name: '',
    job: '',
    sort: 'desc'
  };
  heroes: Hero[];
  constructor(readonly heroeserve: HeroService) {
    this.heroes = this.heroeserve.getHeros();
    console.log('heroes', this.heroes);
  }

  ngOnInit(): void {
  }

  search() {
    console.log(this.searchParams);
  }
}
