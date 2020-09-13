/src/app/share/components/tag/tag.component.ts:
```typescript
const ColorPresets = ['magenta', 'orange', 'green'];
type TagMode = 'default' | 'circle';
@Component({
  selector: 'xm-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TagComponent implements OnInit, AfterViewInit, OnChanges {
  @Input() xmColor = '';
  @Input() xmShape: TagMode = 'default';
  @Input() xmClosable = false;
  @Output() closed = new EventEmitter<void>();

  private currentColorCls = '';

  constructor(private el: ElementRef, private rd2: Renderer2, private cdr: ChangeDetectorRef) {}

  @HostBinding('class.xm-tag') commonCls = true;
  @HostBinding('class.xm-tag-close') get closeCls(): boolean { return this.xmClosable; }
  @HostBinding('class.xm-tag-circle') get circleCls(): boolean { return this.xmShape === 'circle'; }

  private setStyle(): void {
    const tagWrap = this.el.nativeElement;
    if (!tagWrap || !this.xmColor) { return; }
    if (ColorPresets.includes(this.xmColor)) {
      if (this.currentColorCls) {
        this.rd2.removeClass(tagWrap, this.currentColorCls);
        this.currentColorCls = '';
      }
      this.currentColorCls = 'xm-tag-' + this.xmColor;
      this.rd2.addClass(tagWrap, this.currentColorCls);
      this.rd2.removeStyle(tagWrap, 'color');
      this.rd2.removeStyle(tagWrap, 'background-color');
      this.rd2.removeStyle(tagWrap, 'border-color');
    } else {
      this.rd2.setStyle(tagWrap, 'color', '#fff');
      this.rd2.setStyle(tagWrap, 'background-color', this.xmColor);
      this.rd2.setStyle(tagWrap, 'border-color', 'transparent');
    }
  }

  ngAfterViewInit(): void {
    this.setStyle();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.xmColor) {
      this.setStyle();
    }
  }

  ngOnInit(): void {
  }

}

```

tag.component.html:
```angular2html
<ng-content></ng-content>
<i [xm-icon]="'Close'" class="icon-close" *ngIf="xmClosable" (click)="closed.emit()"></i>
```

tag.component.scss:
```scss
.xm-tag {
  display: inline-block;
  box-sizing: border-box;
  color: rgba(0,0,0,.65);
  font-variant: tabular-nums;
  font-feature-settings: "tnum";
  padding: 2px 8px 0;
  font-size: 12px;
  white-space: nowrap;
  background-color: #fafafa;
  border: 1px solid #d9d9d9;
  cursor: pointer;
  transition: all .3s cubic-bezier(.78,.14,.15,.86);
  .icon-close {
    vertical-align: -2px;
    margin-left: 4px;
  }
  &.xm-tag-circle {
    border-radius: 26px;
  }
  &.xm-tag-close {
     padding: 0 6px 0 10px;
    .content {
      margin-right: 4px;
    }
  }
  &.xm-tag-magenta {
    color: #eb2f96;
    background-color: #fff0f6;
    border-color: #ffadd2;
  }
  &.xm-tag-orange {
    color: #fa8c16;
    background-color: #fff7e6;
    border-color: #ffd591;
  }
  &.xm-tag-green {
    color: #52c41a;
    background-color: #f6ffed;
    border-color: #b7eb8f;
  }
}

```

albums.component.html:
```angular2html
<xm-tag [xmClosable]="true" (closed)="unCheckMeta(item)">{{item.metaName}}</xm-tag>
<xm-tag *ngIf="album.isFinished === 2" [xmColor]="'green'" class="tag">完本</xm-tag>
```
