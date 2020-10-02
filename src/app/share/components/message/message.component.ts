import {Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef} from '@angular/core';
import {XmMessageItemData, XmMessageOptions} from './types';

@Component({
  selector: 'xm-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessageComponent implements OnInit {
  readonly defaultConfig: Required<XmMessageOptions> = {
    type: 'info',
    duration: 3000,
    showClose: false
  }
  messages: XmMessageItemData[] = [];
  constructor(private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
  }

  createMessage(message: XmMessageItemData): void {
    message.options = { ...this.defaultConfig, ...message.options };
    this.messages.push(message);
    this.cdr.markForCheck();
    // console.log('messages', this.messages);
  }
}
