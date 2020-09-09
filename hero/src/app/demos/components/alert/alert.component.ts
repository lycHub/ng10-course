import {Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter} from '@angular/core';
type AlertTheme = 'primary' | 'warning' | 'danger';

export interface AlertOption {
  content: string;
  theme?: AlertTheme;
}

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styles: [`
    .close {
      display: block;
      width: 20px;
      height: 20px;
      position: absolute;
      right: 10px;
      top: 50%;
      margin-top: -10px;
      cursor: pointer;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlertComponent implements OnInit {
  options: Required<AlertOption> = {
    content: '',
    theme: 'primary'
  }
  @Output() readonly closed = new EventEmitter<void>();
  constructor() { }

  get wrapCls(): string {
    return 'alert alert-' + this.options.theme + ' fixed-top';
  }

  ngOnInit(): void {
  }
  setOptions(options: AlertOption) {
    // console.log('options', options);
    this.options = { ...this.options, ...options };
  }
}
