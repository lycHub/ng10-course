import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {UserService} from '../../../services/user.service';
import {Hero} from '../../../configs/types';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-user-center',
  templateUrl: './user-center.component.html',
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserCenterComponent implements OnInit {
  user$: Observable<Hero>;
  constructor(private userServe: UserService) {
    this.user$ = this.userServe.user$;
  }

  ngOnInit(): void {}
}
