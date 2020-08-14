import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {Crisis} from './crisis';
import {EMPTY, Observable, of} from 'rxjs';
import {CrisisService} from './crisis.service';
import {first, mergeMap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CrisisDetailResolverService implements Resolve<Crisis>{

  constructor(private crisisServe: CrisisService, private router: Router) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Crisis | never> {
    return this.crisisServe.getCrisis(route.paramMap.get('id')).pipe(
      first(),
      mergeMap(crisis => {
        if (crisis) {
          console.log('找到了crisis');
          return of(crisis);
        } else { // 没找到具体的Crisis
          this.router.navigate(['/crisis-center']);
          return EMPTY;
        }
      })
    );
  }
}
