import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {filter, switchMap} from 'rxjs/operators';
import {combineLatest} from 'rxjs';
import {UserService} from '../../services/user.service';
import {Hero} from '../../configs/types';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {
  currentUser: Hero;
  breadcrumb: string[] = [];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private userServe: UserService) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      switchMap(() => this.route.firstChild.data)
    ).subscribe(data => {
      if (data.breadcrumb?.length) {
        this.breadcrumb = data.breadcrumb;
      }
    });
  }

  ngOnInit(): void {
    this.userServe.getUser().subscribe(user => {
      this.currentUser = user;
      console.log('user', this.currentUser);
      this.cdr.markForCheck();
    });
  }

}
