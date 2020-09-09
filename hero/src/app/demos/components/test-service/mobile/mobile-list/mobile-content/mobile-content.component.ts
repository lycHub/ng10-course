import {Component, Host, Inject, OnInit, Self} from '@angular/core';
import {listToken} from '../mobile-list.component';
import {MobileService} from '../../mobile.service';

@Component({
  selector: 'app-mobile-content',
  template: `
    <p>
      mobile-content works!
      <br>
<!--      listVal: {{ listVal }}-->
    </p>
  `,
  providers: [MobileService]
})
export class MobileContentComponent implements OnInit {

  constructor(private mobileServe: MobileService) {
    console.log('content', this.mobileServe.getMoibles());
  }

  ngOnInit(): void {
  }

}
