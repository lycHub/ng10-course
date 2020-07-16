import {ChangeDetectionStrategy, Component, Inject, OnInit} from '@angular/core';
import {LoggerService} from '../../services/logger.service';
import {UserLoggerService} from '../../services/user-logger.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutComponent implements OnInit {

  constructor(private loggerServe: UserLoggerService, @Inject('httpApi') readonly api) { }

  ngOnInit(): void {
    this.loggerServe.log('layout');
    console.log('api', this.api);
  }

}
