layout.scss:
```scss
.overlay-container {
  position: fixed;
  pointer-events: none;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 100;
  &.overlay-center {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .overlay-mask {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    pointer-events: auto;
    transition: opacity .3s cubic-bezier(.25,.8,.25,1);
    opacity: 0;
    //background-color: rgba(0,0,0,.32);
    &.overlay-mask-show {
      opacity: 1;
    }
  }
}
```

调用：
```typescript
class App {
  create() {
      if (this.overlay) {
        this.dispose();
      }
      this.overlay = this.overlayServe.create({ center: true, fade: true, backgroundColor: 'rgba(0,0,0,.32)' });
      this.rd2.appendChild(this.overlay.overlayElement, this.el.nativeElement);
      merge(
        this.overlay.backdropClick(),
        this.overlay.keyupEvents().pipe(
          pluck('key'),
          switchMap(key => {
            return key.toUpperCase() === 'ESCAPE' ? of(key) : empty();
          })
        )
      ).subscribe(() => this.hide.emit());
      this.visible = true;
    }
}
```


overlay.service.ts
```typescript
export interface OverlayRef {
  container: HTMLElement;
  backdropClick: () => Observable<MouseEvent>;
  backdropKeyup: () => Observable<KeyboardEvent>;
}

export interface OverlayConfig {
  center?: boolean;
  fade?: boolean;
  backgroundColor?: string;
  responseEvents?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class OverlayService {
  private rd2: Renderer2;
  readonly defaultConfig: Required<OverlayConfig> = {
    center: false,
    fade: false,
    responseEvents: true,
    backgroundColor: 'transparent'
  }
  private overlayRef: OverlayRef;
  private config: Required<OverlayConfig>;
  private backdropElement: HTMLElement;
  private detachment$ = new Subject<void>();
  private backdropClick$ = new Subject<MouseEvent>();
  private backdropKeyup$ = new Subject<KeyboardEvent>();
  constructor(
    private rdFactory2: RendererFactory2,
    @Inject(DOCUMENT) private doc: Document,
    @Inject(PLATFORM_ID) private platformId: object) {
    this.rd2 = rdFactory2.createRenderer(null, null);
  }

  create(config?: OverlayConfig): OverlayRef {
    if (isPlatformBrowser(this.platformId)) {
      this.config = { ...this.defaultConfig, ...config };
      const container = this.rd2.createElement('div');
      this.rd2.addClass(container, 'overlay-container');
      container.innerHTML = '<div class="overlay-mask"></div>';
      this.rd2.appendChild(this.doc.body, container);
      this.backdropElement = container.querySelector('.overlay-mask');
      this.setConfigs(container);
      // this.listenEvents();
      this.overlayRef = {
        container,
        backdropClick: this.backdropClick.bind(this),
        backdropKeyup: this.backdropKeyup.bind(this),
      }
      return this.overlayRef;
    }
  }

  private backdropClick(): Observable<MouseEvent> {
    return this.backdropClick$.asObservable();
  }
  private backdropKeyup(): Observable<KeyboardEvent> {
    return this.backdropKeyup$.asObservable();
  }

  private listenEvents(): void {
    merge(
      fromEvent(this.backdropElement, 'click'),
      fromEvent(this.doc, 'keyup')
    ).pipe(takeUntil(this.detachment$)).subscribe((event: MouseEvent | KeyboardEvent) => {
      if (event instanceof  KeyboardEvent) {
        this.backdropKeyup$.next(event);
      } else {
        this.backdropClick$.next(event);
      }
    });
  }

  private setConfigs(container: HTMLElement): void {
    const { center, fade, backgroundColor, responseEvents } = this.config;
    if (center) {
      this.rd2.addClass(container, 'overlay-center');
    }
    if (backgroundColor) {
      this.rd2.setStyle(this.backdropElement, 'background-color', backgroundColor);
    }
    if (fade) {
      timer(0).subscribe(() => {
        this.rd2.addClass(this.backdropElement, 'overlay-mask-show');
      });
    } else {
      this.rd2.addClass(this.backdropElement, 'overlay-mask-show');
    }
    if (responseEvents) {
      this.listenEvents();
    } else {
      this.rd2.setStyle(this.backdropElement, 'pointer-events', 'none');
    }
  }
}

```
