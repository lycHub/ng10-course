import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Base, Category, User} from './types';
import {environment} from '../../../environments/environment';
import {map} from 'rxjs/operators';
import {storageKeys} from '../../configs';

interface LoginRes {
  user: User;
  token: string;
}
const needToken = new HttpHeaders().set(storageKeys.needToken, 'true');
@Injectable({
  providedIn: 'root'
})
export class UserService {
  readonly prefix = '/xmly/';
  constructor(private http: HttpClient) {}
  login(params: Exclude<User, 'name'>): Observable<LoginRes> {
    return this.http
      .post(`${environment.baseUrl}${this.prefix}login`, params)
      .pipe(map((res: Base<LoginRes>) => res.data));
  }

  userInfo(): Observable<LoginRes> {
    return this.http.get(`${environment.baseUrl}${this.prefix}account`, {
      headers: needToken
    }).pipe(map((res: Base<LoginRes>) => res.data));
  }
  logout(): Observable<void> {
    return this.http.get(`${environment.baseUrl}${this.prefix}logout`, {
      headers: needToken
    }).pipe(map((res: Base<void>) => res.data));
  }
}
