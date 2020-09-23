import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  forwardRef,
  HostBinding,
  HostListener,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  // tslint:disable-next-line:component-selector
  selector: '[xm-checkbox]',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxComponent),
      multi: true
    }
  ],
  host: {
    '[class.xm-checkbox-wrap]': 'true'
  }
})
export class CheckboxComponent implements OnInit, ControlValueAccessor {
  @HostBinding('class.checked') checked = false;
  @HostBinding('class.disabled') disabled = false;

  constructor(private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
  }

  @HostListener('click', ['$event'])
  hostClick(event: MouseEvent): void {
    event.preventDefault();
    if (!this.disabled) {
      this.checked = !this.checked;
      this.onChange(this.checked);
    }
  }

  private onChange = (value: boolean) => {};
  private onTouched = () => {};
  writeValue(value: boolean): void {
    this.checked = value;
    this.cdr.markForCheck();
  }
  registerOnChange(fn: (value: boolean) => void): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
  setDisabledState(disabled: boolean): void {
    this.disabled = disabled;
  }
}
