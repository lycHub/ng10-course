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
export class HeroAuthGuard implements CanActivate {
  constructor(
    private contextServe: ContextService,
    private windowServe: WindowService,
    private accountServe: AccountService,
    private router: Router
  ) {}
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    const auths: string[] = next.data.auths;
    return this.contextServe.setContext().pipe(
      switchMap(user => {
        if (user) {
          if (auths.includes(user.role)) {
            return of(true);
          } else {
            this.router.navigateByUrl('/no-auth').then(() => {
              this.windowServe.alert('无权限，请联系管理员');
            });
            return of(false);
          }
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
