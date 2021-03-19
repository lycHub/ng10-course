import { Injectable } from '@angular/core';
import {WindowService} from './window.service';
import {UserService} from './user.service';
import {AccountService} from './account.service';
import {AuthKey} from '../configs/constant';
import {Observable, of} from 'rxjs';
import {mergeMap, switchMap} from 'rxjs/operators';
import {Hero} from '../configs/types';

@Injectable({
  providedIn: 'root'
})
export class ContextService {
  constructor(
    private windowServe: WindowService,
    private userServe: UserService,
    private accountServe: AccountService
  ) { }
  setContext(): Observable<Hero | false> {
    const cacheAuth = this.windowServe.getStorage(AuthKey);
    if (cacheAuth) {
      return this.userServe.user$.pipe(
        mergeMap(user => {
          if (user) {
            return of(user);
          }
          return this.accountServe.account();
        }),
        switchMap(res => {
          let user: Hero;
          if ('token' in res) {
            this.windowServe.setStorage(AuthKey, res.token);
            this.userServe.setUser(res.user);
            user = res.user;
          } else {
            user = res;
          }
          return of(user);
        })
      );
    }
    return of(false);
  }
}
