import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {Hero} from '../configs/types';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private sub = new BehaviorSubject<Hero>(null);
  readonly user$ = this.sub.asObservable();
  constructor() { }
  setUser(user: Hero) {
    this.sub.next(user);
  }
  clearUser(): void {
    this.sub.next(null);
    // this.sub.complete();
  }
}
