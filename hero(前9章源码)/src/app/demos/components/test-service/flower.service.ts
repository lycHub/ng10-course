import { Injectable } from '@angular/core';
import {BetterLoggerService} from './better-logger.service';

@Injectable()
export class FlowerService {
  private flower: string;
  constructor(private betterlogServe: BetterLoggerService) {
    this.flower = this.betterlogServe.flower;
  }
  logFlower() {
    console.log('这是' + this.flower);
  }
}
