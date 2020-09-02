import { Injectable } from '@angular/core';

@Injectable()
export class LogService {
  constructor() {
    console.log('log service 实例化');
  }
}
