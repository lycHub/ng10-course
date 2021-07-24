import { Injectable } from '@angular/core';

@Injectable()
export class LoggerService {
  constructor() { }
  log(msg?: string) {
    console.log('this is log service');
  }
}
