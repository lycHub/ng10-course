import {ChangeDetectionStrategy, Component} from '@angular/core';
import {MobileService} from './demos/components/test-service/mobile/mobile.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  color = 'green';
  constructor(private mobileServe: MobileService) {
    console.log('app', this.mobileServe.getMoibles());
  }
}
