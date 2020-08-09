import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {Observable} from 'rxjs';
import {Hero} from '../hero';
import {HeroService} from '../hero.service';
import {ActivatedRoute, Router} from '@angular/router';
import {switchMap} from 'rxjs/operators';

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
  constructor(private heroServe: HeroService, private router: Router, private route: ActivatedRoute) { }

  /*ngOnInit(): void {
    // this.heroes$ = this.heroServe.getHeroes();
    this.heroes$ = this.route.paramMap.pipe(
      switchMap(params => {
        console.log('params list', params);
        this.selectedId = +params.get('id');
        return this.heroServe.getHeroes();
      })
    );
  }*/

  ngOnInit(): void {
    this.selectedId = +this.route.snapshot.paramMap.get('id');
    this.heroes$ = this.heroServe.getHeroes();
  }

  onSelect(id: number) {
    // this.selectedId = id;
    // this.router.navigateByUrl('/hero/' + id);
    this.router.navigate(['/hero', id]);
  }
}
