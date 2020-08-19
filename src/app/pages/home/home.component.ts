import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {filter, switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {
  breadcrumb: string[] = [];
  constructor(private route: ActivatedRoute, private router: Router) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      switchMap(() => this.route.firstChild.data)
    ).subscribe(data => {
      if (data.breadcrumb?.length) {
        this.breadcrumb = data.breadcrumb;
      }
    });
  }

  ngOnInit(): void {}

}
