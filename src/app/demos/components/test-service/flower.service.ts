import { Injectable } from '@angular/core';

@Injectable()
export class FlowerService {
  private flower: string;
  constructor(flower: string = '黄花') {
    this.flower = flower;
  }
  logFlower() {
    console.log('这是' + this.flower);
  }
}
