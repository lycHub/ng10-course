import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {Base, LoginArg, LoginType} from '../configs/types';
import {catchError, map} from 'rxjs/operators';
import {AuthKey} from '../configs/constant';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private prefix = environment.baseUrl + '/hero/';
  redirectTo = '';
  constructor(private http: HttpClient) { }
  login(args: LoginArg): Observable<LoginType> {
    return this.http.post(this.prefix + 'login', args)
      .pipe(
        map((res: Base<LoginType>) => res.data)
      );
  }

  account(): Observable<LoginType> {
    console.log('aaaaaa');
    return this.http.get(this.prefix + 'account').pipe(
      map((res: Base<LoginType>) => res.data)
    );
  }

  logout(): Observable<Base<void>> {
    return this.http.get<Base<void>>(this.prefix + 'logout');
  }
}
