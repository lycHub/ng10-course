import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {Hero} from '../hero';
import {HeroService} from '../hero.service';
import {MessageService} from '../../message.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {switchMap} from 'rxjs/internal/operators/switchMap';

@Component({
  selector: 'app-hero-list',
  template: `<h2>Heroes</h2>
  <ul class="heroes">
    <li *ngFor="let hero of heroes$ | async" [class.selected]="hero.id === selectedId" (click)="onSelect(hero.id)">
      <span class="badge">{{hero.id}}</span> {{hero.name}}
    </li>
  </ul>`,
  styles: [`
    .heroes {
      margin: 0 0 2em 0;
      list-style-type: none;
      padding: 0;
      width: 15em;
    }
    .heroes li {
      cursor: pointer;
      position: relative;
      left: 0;
      background-color: #EEE;
      margin: .5em;
      padding: .3em 0;
      height: 2.6em;
      border-radius: 4px;
    }
    .heroes li:hover {
      color: #607D8B;
      background-color: #DDD;
      left: .1em;
    }
    .heroes li.selected {
      background-color: #CFD8DC;
      color: white;
    }
    .heroes li.selected:hover {
      background-color: #BBD8DC;
      color: white;
    }
    .heroes .badge {
      display: inline-block;
      font-size: small;
      color: white;
      padding: 0.8em 0.7em 0 0.7em;
      background-color:#405061;
      line-height: 1em;
      position: relative;
      left: -1px;
      top: -4px;
      height: 100%;
      margin-right: .8em;
      border-radius: 4px 0 0 4px;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeroListComponent implements OnInit {
  selectedId: number;

  heroes$: Observable<Hero[]>;

  constructor(
    private heroServe: HeroService,
    private messageService: MessageService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.getHeroes();
  }

  onSelect(id: number): void {
    this.selectedId = id;
    this.messageService.add(`HeroesComponent: Selected hero id=${id}`);
    // this.router.navigateByUrl('/hero/' + id);
    this.router.navigate(['/hero/', id]);
  }

  getHeroes(): void {
    this.heroes$ = this.route.paramMap.pipe(
      switchMap(params => {
        console.log('params', params);
        // (+) String 转 Number
        this.selectedId = +params.get('id');
        return this.heroServe.getHeroes();
      })
    );
  }

}
