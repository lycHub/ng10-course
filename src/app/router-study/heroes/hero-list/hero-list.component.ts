import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {Observable} from 'rxjs';
import {Hero} from '../hero';
import {HeroService} from '../hero.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-hero-list',
  templateUrl: './hero-list.component.html',
  styles: [
    `
        .list-group {
            width: 280px;
            cursor: pointer;
        }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeroListComponent implements OnInit {
  heroes$: Observable<Hero[]>;
  selectedId: number;
  constructor(private heroServe: HeroService, private router: Router) { }

  ngOnInit(): void {
    this.heroes$ = this.heroServe.getHeroes();
  }

  onSelect(id: number) {
    this.selectedId = id;
    // this.router.navigateByUrl('/hero/' + id);
    this.router.navigate(['/hero', id]);
  }
}
