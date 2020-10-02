import {
  ApplicationRef,
  ComponentFactoryResolver,
  ComponentRef,
  Inject,
  Injectable,
  Injector,
  Renderer2,
  RendererFactory2
} from '@angular/core';
import {MessageModule} from './message.module';
import {MessageComponent} from './message.component';
import {DOCUMENT} from '@angular/common';

@Injectable({
  providedIn: MessageModule
})
export class MessageService {
  private message: MessageComponent;
  private componentRef: ComponentRef<MessageComponent>;
  private rd2: Renderer2;
  constructor(
    @Inject(DOCUMENT) private doc: Document,
    private cfr: ComponentFactoryResolver,
    private injector: Injector,
    private appRef: ApplicationRef,
    private rd2Factory: RendererFactory2
  ) {
    this.rd2 = this.rd2Factory.createRenderer(null, null);
  }

  create(): void {
    if (!this.message) {
      this.message = this.getMessage();
    }
    console.log('message', this.message);
  }

  private getMessage(): MessageComponent {
    const factory = this.cfr.resolveComponentFactory(MessageComponent);
    this.componentRef = factory.create(this.injector);
    this.appRef.attachView(this.componentRef.hostView);
    this.rd2.appendChild(this.doc.body, this.componentRef.location.nativeElement);
    return this.componentRef.instance;
  }
}
