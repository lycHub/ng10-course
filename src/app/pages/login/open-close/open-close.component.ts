import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {animate, state, style, transition, trigger, AnimationEvent} from '@angular/animations';

@Component({
  selector: 'app-open-close',
  templateUrl: './open-close.component.html',
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
      transition('* => closed', [
        animate('.3s', style({
          height: '300px',
          backgroundColor: 'blue'
        })),
        animate('2s')
      ]),
      transition('* => open', [
        animate('0.5s')
      ]),
     /* transition('open <=> closed', [
        animate('0.5s')
      ]),*/

    ])
  ]
})
export class OpenCloseComponent implements OnInit {
  isOpen = true;
  constructor() { }

  ngOnInit(): void {
  }
  toggle() {
    this.isOpen = !this.isOpen;
  }

  onAnimationEvent( event: AnimationEvent ) {
    // openClose is trigger name in this example
    console.warn(`Animation Trigger: ${event.triggerName}`);

    // phaseName is start or done
    console.warn(`Phase: ${event.phaseName}`);

    // in our example, totalTime is 1000 or 1 second
    console.warn(`Total time: ${event.totalTime}`);

    // in our example, fromState is either open or closed
    console.warn(`From: ${event.fromState}`);

    // in our example, toState either open or closed
    console.warn(`To: ${event.toState}`);

    // the HTML element itself, the button in this case
    console.warn(`Element: ${event.element}`);
  }
}
