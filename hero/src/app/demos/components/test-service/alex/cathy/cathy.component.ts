import {Component, OnInit, Optional} from '@angular/core';
import {AlexComponent} from '../alex.component';

@Component({
  selector: 'app-cathy',
  template: `
    <div>
      <h3>cathy works!</h3>
      父组件Alex: {{ alex ? '已找到 ' + alex.name : '没找到' }}
    </div>
  `,
  styles: [
  ]
})
export class CathyComponent implements OnInit {

  constructor(readonly alex: AlexComponent) { }

  ngOnInit(): void {
  }

}
