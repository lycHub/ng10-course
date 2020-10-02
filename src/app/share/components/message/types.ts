import {TemplateRef} from '@angular/core';
import {Subject} from 'rxjs';

export type XmMessageType = 'success' | 'info' | 'warning' | 'error';

export interface XmMessageOptions {
  type?: XmMessageType;
  duration?: number;
  showClose?: boolean;
  pauseOnHover?: boolean;
  maxStack?: number;
  animate?: boolean;
}


export interface XmMessageItemData {
  messageId: string;
  content: string | TemplateRef<void>;
  onClose: Subject<void>;
  state: 'enter' | 'leave',
  options?: XmMessageOptions;
}
