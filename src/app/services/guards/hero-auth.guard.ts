import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {UserService} from '../user.service';
import {Observable, of} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {AccountService} from '../account.service';

@Injectable({
  providedIn: 'root'
})
export class HeroAuthGuard implements CanActivate {
  constructor(private userServe: UserService, private accountServe: AccountService, private router: Router) {}
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    const auths: string[] = next.data.auths;
    // console.log('auths', auths);
    return this.userServe.user$.pipe(
      switchMap(user => {
        if (user) {
          if (auths.includes(user.role)) {
            return of(true);
          } else {
            this.router.navigateByUrl('/no-auth').then(() => {
              alert('无权限，请联系管理员');
            });
            return of(false);
          }
        }
        this.accountServe.redirectTo = state.url;
        this.router.navigateByUrl('/login').then(() => {
          alert('请先登陆');
        });
        return of(false);
      }));
  }
}
