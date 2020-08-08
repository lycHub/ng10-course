import {Observable, of} from 'rxjs';
import { Injectable } from '@angular/core';
import {CRISES} from './mock-crises';
import {Crisis} from './crisis';

@Injectable({
  providedIn: 'root',
})
export class CrisisService {
  constructor() { }
  getCrises(): Observable<Crisis[]> {
    return of(CRISES);
  }
}
