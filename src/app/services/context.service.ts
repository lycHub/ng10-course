import { Injectable } from '@angular/core';
import {WindowService} from './window.service';
import {UserService} from './user.service';
import {AccountService} from './account.service';
import {AuthKey} from '../configs/constant';
import {Observable, of} from 'rxjs';
import {switchMap} from 'rxjs/operators';
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
    const auth = this.windowServe.getStorage(AuthKey);
    return new Observable(observer => {
      if (auth) {
        this.userServe.user$.pipe(
          switchMap(user => {
            if (user) {
              return of(user);
            }
            return this.accountServe.account();
          })
        ).subscribe(res => {
          let user: Hero;
          if ('token' in res) {
            this.windowServe.setStorage(AuthKey, res.token);
            this.userServe.setUser(res.user);
            user = res.user;
          } else {
            user = res;
          }
          observer.next(user);
        });
      } else {
        observer.next(false);
      }
      observer.complete();
    });
  }
}
