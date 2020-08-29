import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {Hero} from '../configs/types';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private sub = new Subject<Hero>();
  constructor() { }
  setUser(user: Hero) {
    this.sub.next(user);
  }
  getUser(): Observable<Hero> {
    return this.sub.asObservable();
  }
  clearUser(): void {
    this.sub.next(null);
    // this.sub.complete();
  }
}
