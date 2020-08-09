import {ChangeDetectionStrategy, Component} from '@angular/core';
import {MobileService} from './demos/components/test-service/mobile/mobile.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  color = 'green';
  constructor(private router: Router) {
    // console.log('app', this.mobileServe.getMoibles());
    console.log(this.router.onSameUrlNavigation);
  }

  toCrisisCenter() {
    this.router.navigateByUrl('/crisis-center');
    // this.router.navigate(['/crisis-center']);
  }
  toHeroes() {
    this.router.navigateByUrl('/heroes');
    // this.router.navigate(['/heroes']);
  }
}
