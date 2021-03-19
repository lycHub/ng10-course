import {Component, Inject, OnInit} from '@angular/core';
import {LoggerService} from '../logger.service';
import {APP_CONFIG} from '../token';
import {FlowerService} from '../flower.service';
import {MobileService} from '../mobile/mobile.service';

@Component({
  selector: 'app-flower',
  template: `
    <p>
      flower works!
    </p>
  `,
  styles: [
  ],
  providers: [MobileService]
})
export class FlowerComponent implements OnInit {

  constructor(
    private loggerServe: LoggerService,
    @Inject('httpApi') private uri: string,
    @Inject(APP_CONFIG) private tokenValue: string,
    private flowerServe: FlowerService,
    private mobileServe: MobileService
  ) { }

  ngOnInit(): void {
    console.log('flower', this.mobileServe.getMoibles());
  }

}
