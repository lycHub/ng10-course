import {Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, EventEmitter} from '@angular/core';
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
    showClose: false,
    pauseOnHover: false,
    maxStack: 5
  }
  messages: XmMessageItemData[] = [];
  empty = new EventEmitter();
  constructor(private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
  }

  createMessage(message: XmMessageItemData): void {
    message.options = { ...this.defaultConfig, ...message.options };
    if (message.options.maxStack > 0 && this.messages.length >= message.options.maxStack) {
      this.removeMessage(this.messages[0].messageId);
    }
    this.messages.push(message);
    this.cdr.markForCheck();
    // console.log('messages', this.messages);
  }

  removeMessage(id: string): void {
    // console.log('removeMessage', id);
    const targetIndex = this.messages.findIndex(item => item.messageId === id);
    if (targetIndex > -1) {
      this.messages[targetIndex].onClose.next();
      this.messages[targetIndex].onClose.complete();
      this.messages.splice(targetIndex, 1);
      this.cdr.markForCheck();
    }
    if (this.messages.length === 0) {
      this.empty.emit();
    }
  }
}
