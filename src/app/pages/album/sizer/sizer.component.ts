import {ChangeDetectionStrategy, ChangeDetectorRef, Component, forwardRef, OnInit} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'xm-sizer',
  templateUrl: './sizer.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SizerComponent),
      multi: true
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SizerComponent implements OnInit, ControlValueAccessor {
  size = 16;
  disabled = false;
  // @Output() ngModelChange = new EventEmitter<number>();
  constructor(private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
  }

  inc(): void {
    this.size += 1;
    this.onChange(this.size);
    // this.ngModelChange.emit(this.ngModel + 1);
  }

  dec(): void {
    this.size -= 1;
    this.onChange(this.size);
    // this.ngModelChange.emit(this.ngModel - 1);
  }

  private onChange = (value: number) => {};
  private onTouched = () => {};

  writeValue(value: number): void {
    this.size = value;
    this.cdr.markForCheck();
  }
  registerOnChange(fn: (value: number) => void): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  // 宿主绑定了disabled属性，触发这个函数
  setDisabledState(disabled: boolean): void {
    this.disabled = disabled;
  }

}
