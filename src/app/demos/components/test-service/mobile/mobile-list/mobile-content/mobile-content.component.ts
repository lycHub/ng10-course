import {Component, Inject, OnInit} from '@angular/core';
import {listToken} from '../mobile-list.component';

@Component({
  selector: 'app-mobile-content',
  template: `
    <p>
      mobile-content works!
      <br>
<!--      listVal: {{ listVal }}-->
    </p>
  `,
  styles: [
  ]
})
export class MobileContentComponent implements OnInit {

  constructor() {
    // console.log('listVal', this.listVal);
  }

  ngOnInit(): void {
  }

}
