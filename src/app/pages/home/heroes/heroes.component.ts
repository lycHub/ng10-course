import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Hero, HeroArg} from '../../../configs/types';
import {HeroService} from '../../../services/hero.service';
import {WindowService} from '../../../services/window.service';

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
  heroes: Hero[] = [];
  showSpin = false;
  constructor(private windowServe: WindowService, private heroServe: HeroService, private cdr: ChangeDetectorRef) {

  }

  ngOnInit(): void {
    this.getList();
  }

  search() {
    console.log(this.searchParams);
    this.getList();
  }
  reset() {
    this.searchParams = {
      name: '',
      job: '',
      sort: 'desc'
    };
    this.getList();
  }

  delHero(id: string) {
    const confirm = this.windowServe.confirm('确定删除该英雄?');
    if (confirm) {
      this.heroServe.delHero(id).subscribe(() => {
        this.windowServe.alert('删除成功');
        this.getList();
      });
    }
  }

  getList() {
    this.showSpin = true;
    this.heroServe.heroes(this.searchParams).subscribe(heroes => {
      this.heroes = heroes;
      this.showSpin = false;
      this.cdr.markForCheck();
    }, () => {
      this.showSpin = false;
      this.cdr.markForCheck();
    });
  }
}
