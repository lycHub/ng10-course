import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {UserService} from '../user.service';
import {Observable, of} from 'rxjs';
import {switchMap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginAuthGuard implements CanActivate {
  constructor(private userServe: UserService, private router: Router) {}
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.userServe.user$.pipe(
      switchMap(user => {
        if (user) {
          this.router.navigateByUrl('/home/heroes').then(() => {
            alert('您已登陆，不需要重复登陆');
          });
          return of(false);
        }
        return of(true);
      }));
  }
}
