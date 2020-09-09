import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router, RouterOutlet} from '@angular/router';
import {filter, switchMap} from 'rxjs/operators';
import {combineLatest} from 'rxjs';
import {UserService} from '../../services/user.service';
import {Hero} from '../../configs/types';
import {DOCUMENT} from '@angular/common';
import {AccountService} from '../../services/account.service';
import {WindowService} from '../../services/window.service';
import {AuthKey} from '../../configs/constant';
import {LogService} from '../../services/log.service';
import {animate, animateChild, group, query, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('routeAnimations', [
      transition('* <=> *', [
        style({ position: 'relative' }),
        query(':enter, :leave', [
          style({
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%'
          })
        ], { optional: true }),
        query(':enter', [
          style({ left: '-100%'})
        ], { optional: true }),
        group([
          query(':leave', [
            animate(300, style({ left: '100%'}))
          ], { optional: true }),
          query(':enter', [
            animate(300, style({ left: 0}))
          ], { optional: true })
        ]),
        // 进入或离开页面后，执行页面中的动画
        query(':enter', animateChild())
      ])
    ])
  ]
})
export class HomeComponent implements OnInit {
  currentUser: Hero;
  breadcrumb: string[] = [];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef,
    @Inject(DOCUMENT) private doc: Document,
    private accountServe: AccountService,
    private windowServe: WindowService,
    private userServe: UserService,
    private LogServe: LogService) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      switchMap(() => this.route.firstChild.data)
    ).subscribe(data => {
      console.log('NavigationEnd');
      if (data.breadcrumb?.length) {
        this.breadcrumb = data.breadcrumb;
      }
    });
  }

  ngOnInit(): void {
    this.userServe.user$.subscribe(user => {
      this.currentUser = user;
    });
    // console.log(this.doc);
  }
  logout() {
    this.accountServe.logout().subscribe(() => {
      this.windowServe.removeStorage(AuthKey);
      this.userServe.clearUser();
      this.router.navigateByUrl('/login').then(() => {
        this.windowServe.alert('退出成功');
      });
    });
  }
  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
}
