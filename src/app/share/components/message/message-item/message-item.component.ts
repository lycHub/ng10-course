import {Component, OnInit, ChangeDetectionStrategy, Input} from '@angular/core';
import {XmMessageItemData} from '../types';

@Component({
  selector: 'xm-message-item',
  templateUrl: './message-item.component.html',
  styleUrls: ['./message-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessageItemComponent implements OnInit {
  @Input() index = 0;
  @Input() message: XmMessageItemData;
  constructor() { }

  ngOnInit(): void {
  }

  get itemCls(): string {
    return 'xm-message clearfix ' + this.message.options.type;
  }
}
