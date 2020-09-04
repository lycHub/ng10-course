import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {animate, keyframes, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-status-slider',
  templateUrl: './status-slider.component.html',
  styles: [
    `
          :host {
              display: block;
          }

          .box {
              width: 300px;
              border: 5px solid black;
              display: block;
              line-height: 300px;
              text-align: center;
              font-size: 50px;
              color: white;
          }
    `
  ],
  animations: [
    trigger('slideStatus', [
      state('inactive', style({ backgroundColor: 'blue' })),
      state('active', style({ backgroundColor: 'orange' })),
      transition('* => active', [
        animate('2s', keyframes([
          style({ backgroundColor: 'blue' }),
          style({ backgroundColor: 'red' }),
          style({ backgroundColor: 'orange' })
        ]))
      ]),
      transition('* => inactive', [
        animate('2s', keyframes([
          style({ backgroundColor: 'orange', offset: 0}),
          style({ backgroundColor: 'red', offset: 0.2}),
          style({ backgroundColor: 'blue', offset: 1.0})
        ]))
      ])
    ])
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatusSliderComponent implements OnInit {
  status: 'active' | 'inactive' = 'inactive';
  constructor() { }

  ngOnInit(): void {
  }

  toggle() {
    if (this.status === 'active') {
      this.status = 'inactive';
    } else {
      this.status = 'active';
    }
  }
}
