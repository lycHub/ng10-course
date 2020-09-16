import {
  AfterViewInit,
  Component,
  ElementRef,
  HostBinding,
  Input,
  OnChanges,
  OnInit, Output,
  Renderer2, SimpleChange,
  SimpleChanges,
  ViewEncapsulation,
  EventEmitter
} from '@angular/core';

const ColorPresets = ['magenta', 'orange', 'green'];
type TagMode = 'default' | 'circle';

@Component({
  selector: 'xm-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TagComponent implements OnChanges {
  @Input() xmColor = '';
  @Input() xmShape: TagMode = 'default';
  @Input() xmClosable = false;
  @Output() closed = new EventEmitter<void>();
  @HostBinding('class.xm-tag-circle') get circleCls(): boolean { return this.xmShape === 'circle'; }
  @HostBinding('class.xm-tag-close') get closeCls(): boolean { return this.xmClosable; }
  @HostBinding('class.xm-tag') readonly hostCls = true;

  private currentPresetCls = '';

  constructor(private el: ElementRef, private rd2: Renderer2) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.setStyle(changes.xmColor);
  }

  private setStyle(color: SimpleChange): void {
    const hostEl = this.el.nativeElement;
    if (!hostEl || !this.xmColor) { return; }
    if (this.currentPresetCls) {
      this.rd2.removeClass(hostEl, this.currentPresetCls);
      this.currentPresetCls = '';
    }
    if (ColorPresets.includes(this.xmColor)) {
      this.currentPresetCls = 'xm-tag-' + this.xmColor;
      this.rd2.addClass(hostEl, this.currentPresetCls);
      this.rd2.removeStyle(hostEl, 'color');
      this.rd2.removeStyle(hostEl, 'border-color');
      this.rd2.removeStyle(hostEl, 'background-color');
    } else {
      this.rd2.setStyle(hostEl, 'color', '#fff');
      this.rd2.setStyle(hostEl, 'border-color', 'transparent');
      this.rd2.setStyle(hostEl, 'background-color', color.currentValue);
    }
  }
}
