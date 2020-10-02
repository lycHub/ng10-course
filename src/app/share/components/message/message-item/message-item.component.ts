import {Component, OnInit, ChangeDetectionStrategy, Input, OnDestroy} from '@angular/core';
import {XmMessageItemData} from '../types';
import {MessageComponent} from '../message.component';
import {Subscription, timer} from 'rxjs';

@Component({
  selector: 'xm-message-item',
  templateUrl: './message-item.component.html',
  styleUrls: ['./message-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessageItemComponent implements OnInit, OnDestroy {
  @Input() index = 0;
  @Input() message: XmMessageItemData;
  private timerSub: Subscription;
  private autoClose = true;
  constructor(private parent: MessageComponent) { }

  ngOnInit(): void {
    const { duration } = this.message.options;
    this.autoClose = duration > 0;
    if (this.autoClose) {
      this.createTimer(duration);
    }
  }

  enter(): void {
    if (this.autoClose && this.message.options.pauseOnHover) {
      this.clearTimer();
    }
  }

  leave(): void {
    if (this.autoClose && this.message.options.pauseOnHover) {
      this.createTimer(this.message.options.duration);
    }
  }

  private createTimer(duration: number): void {
    this.timerSub = timer(duration).subscribe(() => {
      this.close();
    });
  }

  private clearTimer(): void {
    if (this.timerSub) {
      this.timerSub.unsubscribe();
      this.timerSub = null;
    }
  }

  close(): void {
    this.parent.removeMessage(this.message.messageId);
  }

  get itemCls(): string {
    return 'xm-message clearfix ' + this.message.options.type;
  }

  ngOnDestroy(): void {
    this.clearTimer();
  }
}
