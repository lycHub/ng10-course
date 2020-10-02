import {
  ApplicationRef,
  ComponentFactoryResolver,
  ComponentRef,
  Inject,
  Injectable,
  Injector, PLATFORM_ID,
  Renderer2,
  RendererFactory2, TemplateRef
} from '@angular/core';
import {MessageModule} from './message.module';
import {MessageComponent} from './message.component';
import {DOCUMENT, isPlatformBrowser} from '@angular/common';
import {XmMessageItemData, XmMessageOptions} from './types';
import {Subject} from 'rxjs';
import { uniqueId } from 'lodash';

@Injectable({
  providedIn: MessageModule
})
export class MessageService {
  private message: MessageComponent;
  private componentRef: ComponentRef<MessageComponent>;
  private rd2: Renderer2;
  constructor(
    @Inject(DOCUMENT) private doc: Document,
    @Inject(PLATFORM_ID) private platformId: object,
    private cfr: ComponentFactoryResolver,
    private injector: Injector,
    private appRef: ApplicationRef,
    private rd2Factory: RendererFactory2
  ) {
    this.rd2 = this.rd2Factory.createRenderer(null, null);
  }

  info(content: string | TemplateRef<void>, options?: XmMessageOptions): XmMessageItemData {
    return this.create(content, { ...options, type: 'info' });
  }

  warning(content: string | TemplateRef<void>, options?: XmMessageOptions): XmMessageItemData {
    return this.create(content, { ...options, type: 'warning' });
  }

  success(content: string | TemplateRef<void>, options?: XmMessageOptions): XmMessageItemData {
    return this.create(content, { ...options, type: 'success' });
  }

  error(content: string | TemplateRef<void>, options?: XmMessageOptions): XmMessageItemData {
    return this.create(content, { ...options, type: 'error' });
  }

  private create(content: string | TemplateRef<void>, options?: XmMessageOptions): XmMessageItemData {
    const messageItemData: XmMessageItemData = {
      messageId: uniqueId('message-'),
      content,
      state: 'enter',
      onClose: new Subject<void>(),
      options
    }
    if (isPlatformBrowser(this.platformId)) {
      if (!this.message) {
        this.message = this.getMessage();
      }
      this.message.createMessage(messageItemData);
    }
    return messageItemData;
  }

  private getMessage(): MessageComponent {
    const factory = this.cfr.resolveComponentFactory(MessageComponent);
    this.componentRef = factory.create(this.injector);
    this.appRef.attachView(this.componentRef.hostView);
    this.rd2.appendChild(this.doc.body, this.componentRef.location.nativeElement);
    const { instance } = this.componentRef;
    this.componentRef.onDestroy(() => {
      console.log('已销毁');
    });
    instance.empty.subscribe(() => {
      this.destory();
    });
    return instance;
  }

  private destory(): void {
    this.componentRef.destroy();
    this.message = null;
  }
}
