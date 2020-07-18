import {Component, Inject, OnInit} from '@angular/core';
import {LoggerService} from '../logger.service';
import {APP_CONFIG} from '../token';
import {FlowerService} from '../flower.service';

@Component({
  selector: 'app-flower',
  template: `
    <p>
      flower works!
    </p>
  `,
  styles: [
  ]
})
export class FlowerComponent implements OnInit {

  constructor(
    private loggerServe: LoggerService,
    @Inject('httpApi') private uri: string,
    @Inject(APP_CONFIG) private tokenValue: string,
    private flowerServe: FlowerService
  ) { }

  ngOnInit(): void {
    // console.log(this.loggerServe);
    // console.log('uri', this.uri);
    // console.log('tokenValue', this.tokenValue);
    this.flowerServe.logFlower();
  }

}
