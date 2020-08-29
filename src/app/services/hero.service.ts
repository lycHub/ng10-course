import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  private prefix = environment.baseUrl + '/hero/';
  constructor(private http: HttpClient) { }
  heroes() {
    this.http.get(this.prefix + 'list').subscribe(res => {
      console.log(res);
    });
  }
}
