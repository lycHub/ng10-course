import {Component, InjectionToken, OnInit} from '@angular/core';
import {Mobile, MobileService} from '../mobile.service';
export const listToken = new InjectionToken<string>('list token');
@Component({
  selector: 'app-mobile-list',
  template: `
    <div class="mobile-list">
      <h3>这里是mobile list</h3>
      <section>
<!--        <app-mobile-item *ngFor="let item of mobiles"></app-mobile-item>-->
        <app-mobile-item></app-mobile-item>
      </section>
      <section>
        <p>这里是投影内容</p>
        <ng-content></ng-content>
      </section>
    </div>
  `,
  styles: [
  ],
  // providers: [MobileService]
  // viewProviders: [{ provide: listToken, useValue: '这是list提供的value' }]
})
export class MobileListComponent implements OnInit {
  mobiles: Mobile[] = [];
  constructor() {
    // this.mobiles = this.mobileServe.getMoibles();
    console.log('mobiles', this.mobiles);
  }

  ngOnInit(): void {
  }

}
