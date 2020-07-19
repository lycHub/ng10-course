import {Component, Host, Inject, OnInit, Optional, Self, SkipSelf} from '@angular/core';
import {Mobile, MobileService} from '../mobile.service';
import {listToken} from '../mobile-list/mobile-list.component';

@Component({
  selector: 'app-mobile-item',
  template: `
    <div class="mobile-item">
      <h4>这里是 mobile item</h4>
      current mobild: {{ mobile?.name }}
    </div>
  `,
  styles: [
  ]
})
export class MobileItemComponent implements OnInit {
  mobile: Mobile;
  constructor(@Inject(listToken) readonly listVal: string) {
    // this.mobile = this.mobileServe.getMoible('m2');
    console.log('view item', this.listVal);
  }

  ngOnInit(): void {
  }

}
