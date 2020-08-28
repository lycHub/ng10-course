import { Injectable } from '@angular/core';
import Heros from '../configs/hero';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  private prefix = '/api/hero/';
  constructor(private http: HttpClient) { }
  heroes() {
    this.http.get(this.prefix + 'list').subscribe(res => {
      console.log(res);
    });
  }
}
