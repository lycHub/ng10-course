import { Component, OnInit } from '@angular/core';
import {Base, Parent} from '../alex.component';

@Component({
  selector: 'app-carol',
  template: `
    <div>
      <h3>carol works!</h3>
      父组件Alex: {{ alex ? '已找到 ' + alex.name : '没找到' }}
    </div>
  `,
  styles: [
  ]
})
export class CarolComponent implements OnInit {

  constructor(readonly alex: Parent) { }

  ngOnInit(): void {
  }

}
