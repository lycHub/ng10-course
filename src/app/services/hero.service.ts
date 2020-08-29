import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
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
      .pipe(map((res: Base<Hero[]>) => res.data));
  }
}
