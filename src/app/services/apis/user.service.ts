import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Base, Category, User} from './types';
import {environment} from '../../../environments/environment';
import {map} from 'rxjs/operators';

interface LoginRes {
  user: User;
  token: string;
}


@Injectable({
  providedIn: 'root'
})
export class UserService {
  readonly prefix = '/xmly/';
  constructor(private http: HttpClient) {}
  login(params: Exclude<User, 'name'>): Observable<LoginRes> {
    return this.http
      .post(`${environment.baseUrl}${this.prefix}loginsss`, params)
      .pipe(map((res: Base<LoginRes>) => res.data));
  }
}
