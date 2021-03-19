import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {UserService} from '../user.service';
import {Observable, of} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {AccountService} from '../account.service';
import {WindowService} from '../window.service';
import {ContextService} from '../context.service';

@Injectable({
  providedIn: 'root'
})
export class UserAuthGuard implements CanActivate {
  constructor(
    private contextServe: ContextService,
    private windowServe: WindowService,
    private accountServe: AccountService,
    private router: Router
  ) {}
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.contextServe.setContext().pipe(
      switchMap(user => {
        if (user) {
          return of(true);
        }
        this.accountServe.redirectTo = state.url;
        this.router.navigateByUrl('/login').then(() => {
          this.windowServe.alert('请先登陆');
        });
        return of(false);
      })
    );
  }
}
