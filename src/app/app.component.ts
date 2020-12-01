import {ChangeDetectionStrategy, Component} from '@angular/core';
import {Router} from '@angular/router';
import {first} from 'rxjs/operators';
import {UserService} from './services/user.service';
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
    this.contextServe.setContext().pipe(first()).subscribe();
  }
}
