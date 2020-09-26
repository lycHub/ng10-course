import {Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter, Input, TemplateRef} from '@angular/core';

@Component({
  selector: 'xm-rate-item',
  templateUrl: './rate-item.component.html',
  styleUrls: ['./rate-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RateItemComponent implements OnInit {
  @Input() tpl: TemplateRef<void>;
  @Input() rateItemCls = 'xm-rate-item';
  @Output() private itemHover = new EventEmitter<boolean>();
  @Output() private itemClick = new EventEmitter<boolean>();
  constructor() { }

  ngOnInit(): void {
  }

  hoverRate(isHalf: boolean): void {
    this.itemHover.emit(isHalf);
  }

  clickRate(isHalf: boolean): void {
    this.itemClick.emit(isHalf);
  }
}
