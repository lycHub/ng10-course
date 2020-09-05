import {Component, OnInit, ChangeDetectionStrategy, HostBinding} from '@angular/core';
import {UserService} from '../../../services/user.service';
import {Hero} from '../../../configs/types';
import {Observable} from 'rxjs';
import {animate, query, stagger, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-user-center',
  templateUrl: './user-center.component.html',
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('pageAnimations', [
      transition(':enter', [
        query('.user-center', [
          style({opacity: 0, transform: 'translateY(-100px)'}),
          stagger(300, [
            animate('500ms cubic-bezier(0.35, 0, 0.25, 1)', style({ opacity: 1, transform: 'none' }))
          ])
        ])
      ])
    ])
  ]
})
export class UserCenterComponent implements OnInit {
  user$: Observable<Hero>;
  constructor(private userServe: UserService) {
    this.user$ = this.userServe.user$;
  }

  @HostBinding('@pageAnimations')
  public animatePage = true;
  ngOnInit(): void {}
}
