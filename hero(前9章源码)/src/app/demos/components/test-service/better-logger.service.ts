import { Injectable } from '@angular/core';

@Injectable()
export class BetterLoggerService {
  flower = 'better logger 的 🌹';
  constructor() { }
  log(msg: string) {
    console.log('this is better log ' + msg);
  }
}
