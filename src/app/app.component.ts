import {ChangeDetectionStrategy, Component} from '@angular/core';
import {MobileService} from './demos/components/test-service/mobile/mobile.service';
import {NavigationEnd, NavigationStart, Router} from '@angular/router';
import {filter} from 'rxjs/operators';
// import {add} from './number';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  color = 'green';
  constructor(private router: Router) {

  }

  toCrisisCenter() {
    this.router.navigateByUrl('/crisis-center');
    // this.router.navigate(['/crisis-center']);
  }
  toHeroes() {
    this.router.navigateByUrl('/heroes');
    // this.router.navigate(['/heroes']);
  }

  alertResult(...args: number[]) {
    import('./number').then(({ default: d, add }) => {
      console.log('d', d);
      alert(add(args));
    });
  }
}
