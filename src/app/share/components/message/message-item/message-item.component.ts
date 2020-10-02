import {Component, OnInit, ChangeDetectionStrategy, Input} from '@angular/core';
import {XmMessageItemData} from '../types';
import {MessageComponent} from '../message.component';

@Component({
  selector: 'xm-message-item',
  templateUrl: './message-item.component.html',
  styleUrls: ['./message-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessageItemComponent implements OnInit {
  @Input() index = 0;
  @Input() message: XmMessageItemData;
  constructor(private parent: MessageComponent) { }

  ngOnInit(): void {
  }

  close(): void {
    this.parent.removeMessage(this.message.messageId);
  }

  get itemCls(): string {
    return 'xm-message clearfix ' + this.message.options.type;
  }
}
