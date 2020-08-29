import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable, throwError} from 'rxjs';
import {catchError, map, timeout} from 'rxjs/operators';
import {Base, Hero, HeroArg} from '../configs/types';
import { stringify } from 'qs';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  private prefix = environment.baseUrl + '/hero/';
  constructor(private http: HttpClient) { }
  heroes(args: HeroArg): Observable<Hero[]> {
    const params = new HttpParams({ fromString: stringify(args) });
    return this.http.get(this.prefix + 'list', { params })
      .pipe(
        timeout(2000),
        map((res: Base<Hero[]>) => res.data),
        catchError(error => this.handleError(error))
      );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('error', error);
    if (typeof error.error?.code === 'number') { // 后台拒绝请求
      alert(error.error.message);
    } else {
      alert('请求失败');
    }
    return throwError(error);
  }
}
