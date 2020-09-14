/src/app/share/directives/icon/icon.directive.ts:
```typescript
@Directive({
  selector: 'i[xmIcon]',
  // tslint:disable-next-line:no-host-metadata-property
  host: {
    '[class.iconfont]': 'true'
  }
})
export class IconDirective implements OnChanges {
  @Input('xmIcon') type: IconType;
  constructor(private el: ElementRef, private rd2: Renderer2) {}
  ngOnChanges(changes: SimpleChanges): void {
    const { type } = changes;
    if (type) {
      if (!type.firstChange) {
        this.rd2.addClass(this.el.nativeElement, 'icon-' + this.type);
      }
      this.rd2.addClass(this.el.nativeElement, 'icon-' + this.type);
    }
  }
}

```

/src/app/share/directives/icon/types.ts:
```typescript
export type IconType
  =
  'headset'
  | 'play1'
  | 'play'
  | 'add'
  | 'delete'
  | 'pause'
  | 'next'
  | 'previous'
  | 'Add'
  | 'previewleft'
  | 'previewright'
  | 'more'
  | 'Doublearrowleft'
  | 'Doublearrowright'
  | 'adduser'
  | 'Close'
  | 'arrow-up-line'
  | 'arrow-down-line'
  | 'Star'
  | 'mulu';

```

albums.component.html:
```angular2html
<i class="icon" xmIcon="headset"></i>
```
