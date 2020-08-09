import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {Observable} from 'rxjs';
import {Hero} from '../../heroes/hero';
import {ActivatedRoute, Router} from '@angular/router';
import {HeroService} from '../../heroes/hero.service';
import {switchMap} from 'rxjs/operators';
import {Crisis} from '../crisis';
import {CrisisService} from '../crisis.service';

@Component({
  selector: 'app-crisis-detail',
  templateUrl: './crisis-detail.component.html',
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CrisisDetailComponent implements OnInit {
  crisis$: Observable<Crisis>;
  constructor(private router: Router, private route: ActivatedRoute, private crisisServe: CrisisService) { }
  ngOnInit(): void {
    this.crisis$ = this.route.paramMap.pipe(switchMap(params => {
      return this.crisisServe.getCrisis(params.get('id'));
    }));
  }

 /* back(id: number) {
    this.router.navigate(['/heroes', { id }]);
  }*/

}
