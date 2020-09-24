import {Component, OnInit, ChangeDetectionStrategy, forwardRef} from '@angular/core';
import {CheckboxComponent} from './checkbox.component';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

export type CheckboxValue = number | string;

@Component({
  selector: 'xm-checkbox-group',
  template: `
    <div class="xm-checkbox-group">
      <ng-content></ng-content>
    </div>
  `,
  styles: [
    `
        .xm-checkbox-group {
            display: inline-block;
        }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxGroupComponent),
      multi: true
    }
  ],
})
export class CheckboxGroupComponent implements OnInit, ControlValueAccessor {
  private checkboxes: CheckboxComponent[] = [];
  private current: CheckboxValue[] = [];
 /* @Input()
  set initCurrent(checks: CheckboxValue[]) {
    console.log('init', checks);
    this.current = checks;
    if (checks.length) {
      setTimeout(() => {
        this.updateCheckBox(checks);
      }, 0);
    }
  }*/
  constructor() { }

  ngOnInit(): void {
  }

  addCheckbox(checkbox: CheckboxComponent): void {
    this.checkboxes.push(checkbox);
  }
  updateCheckBox(current: CheckboxValue[]): void {
    if (this.checkboxes.length) {
      this.checkboxes.forEach(item => {
        item.writeValue(current.includes(item.value));
      });
    }
    this.current = current;
    this.onChange(this.current);
  }

  handleCheckboxClick(value: CheckboxValue, check: boolean): void {
    const newCurrent = this.current.slice();
    if (check) {
      if (!newCurrent.includes(value)) {
        newCurrent.push(value);
      }
    } else {
      const targetIndex = newCurrent.findIndex(item => item === value);
      if (targetIndex > -1) {
        newCurrent.splice(targetIndex, 1);
      }
    }
    console.log('newCurrent', newCurrent);
    this.writeValue(newCurrent);
  }

  private onChange = (value: CheckboxValue[]) => {};
  private onTouched = () => {};
  writeValue(value: CheckboxValue[]): void {
    if (value) {
      this.updateCheckBox(value);
    }
  }
  registerOnChange(fn: (value: CheckboxValue[]) => void): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
}
