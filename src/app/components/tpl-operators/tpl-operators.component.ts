import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tpl-operators',
  templateUrl: './tpl-operators.component.html',
  styles: [
  ]
})
export class TplOperatorsComponent implements OnInit {
  title = 'aBc';
  obj = {
    name: 'aaa',
    time: '1980-02-25T05:00:00.000Z',
    price: '$333'
  };
  now = Date.now();
  constructor() { }

  ngOnInit(): void {
  }

}
