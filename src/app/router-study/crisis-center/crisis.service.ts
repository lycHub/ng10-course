import {Observable, of} from 'rxjs';
import { Injectable } from '@angular/core';
import { MessageService } from '../message.service';
import {CRISES} from './mock-crises';
import {Crisis} from './crisis';

@Injectable({
  providedIn: 'root',
})
export class CrisisService {
  constructor(private messageService: MessageService) { }

  getCrises(): Observable<Crisis[]> {
    // TODO: send the message _after_ fetching the heroes
    this.messageService.add('CrisisService: fetched crises');
    return of(CRISES);
  }
}
