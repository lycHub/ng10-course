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
        map((res: Base<Hero[]>) => res.data)
      );
  }


  addHero(args: HeroArg): Observable<any> {
    return this.http.post(this.prefix + 'add', args)
      .pipe(
        map((res: Base<any>) => res.data)
      );
  }
}
