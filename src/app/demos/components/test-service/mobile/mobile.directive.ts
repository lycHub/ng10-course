import { Directive } from '@angular/core';
import {MobileService} from './mobile.service';

@Directive({
  selector: '[appMobile]',
  providers: [{ provide: 'flowerToken', useValue: { emoji: '🌼' } }]
})
export class MobileDirective {

  constructor() {
    console.log('这是mobile 指令');
  }

}
