import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-open-close-two',
  templateUrl: './open-close-two.component.html',
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('openClose', [
      state('open', style({
        height: '200px',
        opacity: 1,
        backgroundColor: 'yellow'
      })),
      state('closed', style({
        height: '100px',
        opacity: 0.5,
        backgroundColor: 'green'
      })),
      transition('open <=> closed', animate('0.5s'))
    ])
  ]
})
export class OpenCloseTwoComponent implements OnInit {
  isDisabled = false;
  isOpen = false;
  constructor() { }

  ngOnInit(): void {
  }

}
