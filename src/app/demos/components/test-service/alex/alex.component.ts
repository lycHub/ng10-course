import {Component, forwardRef, OnInit} from '@angular/core';
export abstract class Base {
  name: string;
}
export abstract class Parent { name: string; }
@Component({
  selector: 'app-alex',
  template: `
    <div class="a">
      <h3>{{name}}</h3>
      <app-cathy></app-cathy>
      <app-craig></app-craig>
      <app-carol></app-carol>
    </div>`,
  styles: [
  ],
  providers: [{ provide: Parent, useExisting: forwardRef(() => AlexComponent) }],
})
export class AlexComponent implements Parent, OnInit {
  name = 'Alex';
  constructor() {}

  ngOnInit(): void {
  }

}
