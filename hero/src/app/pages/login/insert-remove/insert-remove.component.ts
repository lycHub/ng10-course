import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {animate, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-insert-remove',
  templateUrl: './insert-remove.component.html',
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('myInsertRemoveTrigger', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate(1000, style({ opacity: 1 })),
      ]),
      transition(':leave', animate(500, style({ opacity: 0 })))
    ]),
  ]
})
export class InsertRemoveComponent implements OnInit {
  isShown = true;
  constructor() { }

  ngOnInit(): void {
  }

}
