import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  forwardRef,
  Input,
  OnInit,
  Output, TemplateRef,
  ViewEncapsulation
} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'xm-rate',
  templateUrl: './rate.component.html',
  styleUrls: ['./rate.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RateComponent),
      multi: true
    }
  ]
})
export class RateComponent implements OnInit, ControlValueAccessor {
  @Input() count = 5;
  @Input() tpl: TemplateRef<void>;
  private readonly  = false;
  starArray: number[] = [];
  private hoverValue = 0;
  private actualValue = 0;
  private hasHalf = false;
  rateItemStyles: string[] = [];
  @Output() changed = new EventEmitter<number>();
  constructor(private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.updateStarArray();
  }

  rateHover(isHalf: boolean, index: number): void {
    if (this.readonly || (this.hoverValue === index + 1 && isHalf === this.hasHalf)) {
      return;
    }
    this.hoverValue = index + 1;
    this.hasHalf = isHalf;
    // console.log('hoverValue', this.hoverValue);
    this.updateStarStyle();
  }

  rateClick(isHalf: boolean, index: number): void {
    if (this.readonly) {
      return;
    }
    this.hoverValue = index + 1;
    this.hasHalf = isHalf;
    this.setActualValue(isHalf ? index + 0.5 : this.hoverValue);
    this.updateStarStyle();
  }

  private setActualValue(value: number): void {
    if (this.actualValue !== value) {
      this.actualValue = value;
      this.onChange(value);
      this.changed.emit(value);
    }
  }
  rateLeave(): void {
    this.hasHalf = !Number.isInteger(this.actualValue);
    this.hoverValue = Math.ceil(this.actualValue);
    this.updateStarStyle();
  }

  private updateStarArray(): void {
    this.starArray = Array(this.count).fill(0).map((item, index) => index);
    // console.log('starArray', this.starArray);
  }

  private updateStarStyle(): void {
    this.rateItemStyles = this.starArray.map(index => {
      const base = 'xm-rate-item';
      const value = index + 1;
      let cls = '';
      if (value < this.hoverValue || (!this.hasHalf && value === this.hoverValue)) {
        cls += base + '-full';
      } else if (this.hasHalf && value === this.hoverValue) {
        cls += base + '-half';
      }
      const midCls = this.readonly ? ' xm-rate-item-readonly ' : ' ';
      return base + midCls + cls;
    });
  }

  onChange: (value: number) => void = () => {};
  onTouched: () => void = () => {};
  writeValue(value: number): void {
    // console.log('writeValue', value);
    if (value) {
      this.actualValue = value;
      this.rateLeave();
      this.cdr.markForCheck();
    }
  }
  registerOnChange(fn: (value: number) => void): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    this.readonly = isDisabled;
  }
}
