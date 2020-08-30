import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable, throwError} from 'rxjs';
import {catchError, map, timeout} from 'rxjs/operators';
import {Base, Hero, HeroArg, UpdateHeroArg} from '../configs/types';
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

  hero(id: string): Observable<Hero> {
    return this.http.get(this.prefix + 'detail/' + id)
      .pipe(
        map((res: Base<Hero>) => res.data)
      );
  }


  addHero(args: UpdateHeroArg): Observable<Base<void>> {
    return this.http.post<Base<void>>(this.prefix + 'add', args);
  }

  updateHero(id: string, args: UpdateHeroArg): Observable<Base<void>> {
    return this.http.patch<Base<void>>(this.prefix + 'modify/' + id, args);
  }

  delHero(id: string): Observable<Base<void>> {
    return this.http.delete<Base<void>>(this.prefix + 'remove/' + id);
  }
}
