/src/share/components/checkbox/checkbox.component.html:
```angular2html
<div class="xm-checkbox-wrap">
  <label class="xm-checkbox">
    <!--            <input class="xm-checkbox-input" type="checkbox" />-->
    <span class="xm-checkbox-inner"></span>
  </label>
  <span class="xm-checkbox-content">
    <ng-content></ng-content>
  </span>
</div>

```


/src/share/components/checkbox/checkbox.component.scss:
```scss
.xm-checkbox-wrap {
  display: inline-block;
  box-sizing: border-box;
  color: rgba(0,0,0,.65);
  font-size: 14px;
  line-height: 1.5715;
  list-style: none;
  cursor: pointer;
  &:hover, &.focus {
    .xm-checkbox .xm-checkbox-inner {
      border-color: #f86442;
    }
  }
  &.checked {
    .xm-checkbox .xm-checkbox-inner {
      border-color: #f86442;
      background-color: #f86442;
      &:after {
        display: block;
      }
    }
  }
  &.disabled {
    cursor: not-allowed;
    .xm-checkbox .xm-checkbox-inner {
      background-color: #f5f5f5;
      border-color: #d9d9d9;
      cursor: not-allowed;
      &:after {
        border-color: rgba(0,0,0,.25);
      }
    }
    .xm-checkbox-content {
      color: #d9d9d9;
    }
  }
  .xm-checkbox {
    /*.xm-checkbox-input {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: 1;
      width: 100%;
      height: 100%;
      cursor: pointer;
      opacity: 0;
    }*/
    display: inline-block;
    cursor: pointer;
    vertical-align: sub;
    .xm-checkbox-inner {
      position: relative;
      top: 0;
      left: 0;
      display: block;
      width: 16px;
      height: 16px;
      direction: ltr;
      background-color: #fff;
      border: 1px solid #d9d9d9;
      border-radius: 2px;
      border-collapse: separate;
      transition: all .3s;
      &:after {
        display: none;
        position: absolute;
        top: 50%;
        left: 50%;
        width: 4px;
        height: 8px;
        margin-left: -3px;
        margin-top: -6px;
        border: 2px solid #fff;
        border-top: 0;
        border-left: 0;
        transform: rotate(45deg);
        transition: all .2s cubic-bezier(.12,.4,.29,1.46) .1s;
        content: " ";
      }
    }
  }
  .xm-checkbox-content {
    padding: 0 8px 0 4px;
  }
}

```


调用:
```angular2html
<p>
    checkbox:
    <xm-checkbox>苹果</xm-checkbox>
</p>
```


/src/share/components/checkbox/checkbox-group.component.ts:
```typescript

export type CheckboxValue = number | string;

@Component({
  selector: 'xm-checkbox-group',
  template: `
    <div class="xm-checkbox-group"><ng-content></ng-content></div>
  `,
  styles: [
    `
      .xm-checkbox-group { display: inline-block; }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxGroupComponent),
      multi: true
    }
  ]
})
export class CheckboxGroupComponent implements OnInit, ControlValueAccessor {
  private checkboxes: CheckboxComponent[] = [];
  private current: CheckboxValue[];
  constructor() { }

  ngOnInit(): void {
  }
  addCheckbox(checkbox: CheckboxComponent): void {
    this.checkboxes.push(checkbox);
  }


  updateCheckbox(current: CheckboxValue[]): void {
    if (this.checkboxes.length) {
      for (const child of this.checkboxes) {
        child.writeValue(current.includes(child.value));
      }
    }
    this.current = current;
    this.onChange(this.current);
  }

  handleCheckboxClick(value: CheckboxValue, checked: boolean): void {
    const newCurrent = this.current.slice();
    if (checked) {
      if (!newCurrent.includes(value)) {
        newCurrent.push(value);
      }
    } else {
      const targetIndex = newCurrent.findIndex(item => item === value);
      if (targetIndex > -1) {
        newCurrent.splice(targetIndex, 1);
      }
    }
    this.updateCheckbox(newCurrent);
  }

  private onChange = (value: CheckboxValue[]) => {};
  private onTouched = () => {};
  writeValue(current: CheckboxValue[]): void {
    if (current) {
      this.updateCheckbox(current);
    }
  }
  registerOnChange(fn: (value: CheckboxValue[]) => void): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
}

```
