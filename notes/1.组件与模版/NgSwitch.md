## 基本使用
> ngSwitch是内置的结构型指令，控制显示那个模版，类似js中的switch

```typescript
import {Component} from '@angular/core';
@Component({
  selector: 'app-switch',
  template: `
    <p>
      <input type="radio" name="fruit" value="apple" id="apple" [(ngModel)]="fruit" />
      <label for="apple">🍎</label>
    </p>
    <p>
      <input type="radio" name="fruit" value="pear" id="pear" [(ngModel)]="fruit" />
      <label for="pear">🍐</label>
    </p>
    <p>
      <input type="radio" name="fruit" value="grape" id="grape" [(ngModel)]="fruit" />
      <label for="grape">🍇</label>
    </p>
    
    selected fruit: {{ fruit }}
    
    <div class="content" [ngSwitch]="fruit">
      <p *ngSwitchCase="'apple'">这是 苹果</p>
      <p *ngSwitchCase="'pear'">这是 梨</p>
      <p *ngSwitchCase="'grape'">这是 葡萄</p>
      <p *ngSwitchDefault>啥都不是</p>
    </div>
  `,
})
export class SwitchComponent {
  fruit = '';
}
```
