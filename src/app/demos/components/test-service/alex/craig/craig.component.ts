import { Component, OnInit } from '@angular/core';
import {AlexComponent, Base} from '../alex.component';

@Component({
  selector: 'app-craig',
  template: `
    <div>
      <h3>Craig works!</h3>
<!--      父组件Alex: {{ alex ? '已找到 ' + alex.name : '没找到' }}-->
    </div>
  `,
  styles: [
  ]
})
export class CraigComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
