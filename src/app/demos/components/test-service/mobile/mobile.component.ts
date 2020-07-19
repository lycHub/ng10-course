import { Component, OnInit } from '@angular/core';
import {MobileService} from './mobile.service';

@Component({
  selector: 'app-mobile',
  template: `
    <div class="mobile">
      <h2>这里是Mobile</h2>
      <section>
        <app-mobile-list>
          <app-mobile-content></app-mobile-content>
        </app-mobile-list>
      </section>
    </div>
  `,
  styles: [
  ],
  providers: [MobileService]
})
export class MobileComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
