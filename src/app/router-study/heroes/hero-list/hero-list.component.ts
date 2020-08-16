import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {Observable} from 'rxjs';
import {Hero} from '../hero';
import {HeroService} from '../hero.service';
import {ActivatedRoute, NavigationEnd, NavigationStart, Router} from '@angular/router';
import {filter, switchMap} from 'rxjs/operators';

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
  constructor(private heroServe: HeroService, private router: Router, private route: ActivatedRoute) {
    this.router.events
      .pipe(filter(events => events instanceof NavigationStart))
      .subscribe((event: NavigationStart) => {
        console.log('start event', event);
        console.log(this.router.parseUrl(event.url));
      });
    this.router.events
      .pipe(filter(events => events instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        console.log('end event', event);
        console.log(this.router.parseUrl(event.url));
      });
  }

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
    // this.getQueryName();
  }

  private getQueryName() {
    console.log(this.route.snapshot.queryParamMap.get('name'));
    /* this.route.queryParamMap.subscribe(res => {
       console.log(res.get('name'));
     });*/
  }

  onSelect(id: number) {
    // this.selectedId = id;
    // this.router.navigateByUrl('/hero/' + id);
    this.router.navigate(['/hero', id]);
  }
}
