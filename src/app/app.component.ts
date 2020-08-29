import {ChangeDetectionStrategy, Component} from '@angular/core';
import {NavigationEnd, NavigationStart, Router} from '@angular/router';
import {filter, switchMap} from 'rxjs/operators';
import {combineLatest, EMPTY} from 'rxjs';
import {UserService} from './services/user.service';
import {AuthKey} from './configs/constant';
import {AccountService} from './services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  color = 'green';
  constructor(private router: Router, private userServe: UserService, private accountServe: AccountService) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationStart),
      switchMap(() => this.userServe.user$),
      switchMap(user => {
        const authKey = localStorage.getItem(AuthKey);
        if (!user && authKey) {
          return this.accountServe.account(authKey);
        }
        return EMPTY;
      })
    ).subscribe(({ user, token }) => {
      localStorage.setItem(AuthKey, token);
      this.userServe.setUser(user);
    });
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
