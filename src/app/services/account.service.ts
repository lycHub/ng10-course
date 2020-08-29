import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {Base, LoginArg, LoginType} from '../configs/types';
import {catchError, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private prefix = environment.baseUrl + '/hero/';
  constructor(private http: HttpClient) { }
  login(args: LoginArg): Observable<LoginType> {
    return this.http.post(this.prefix + 'login', args)
      .pipe(
        map((res: Base<LoginType>) => res.data),
        catchError(error => this.handleError(error))
      );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    // console.error('error', error);
    if (typeof error.error?.code === 'number') { // 后台拒绝请求
      alert(error.error.message);
    } else {
      alert('请求失败');
    }
    return throwError(error);
  }
}
