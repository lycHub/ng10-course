import {ChangeDetectionStrategy, Component} from '@angular/core';
import {NavigationEnd, NavigationStart, Router} from '@angular/router';
import {filter, switchMap} from 'rxjs/operators';
import {combineLatest, EMPTY} from 'rxjs';
import {UserService} from './services/user.service';
import {AuthKey} from './configs/constant';
import {AccountService} from './services/account.service';
import {WindowService} from './services/window.service';
import {ContextService} from './services/context.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  color = 'green';
  constructor(
    private router: Router,
    private windowServe: WindowService,
    private userServe: UserService,
    private contextServe: ContextService
  ) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationStart),
      switchMap(() => this.contextServe.setContext())
    ).subscribe(res => {
      console.log('app set context', res);
    });
  }
}
