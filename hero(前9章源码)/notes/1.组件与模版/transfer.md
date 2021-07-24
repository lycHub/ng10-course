## 基本布局
transfer-panel.component.html
```angular2html
<div class="transfer-panel border rounded">
  <div class="head pl-3">
    <p>
      <span>12 /</span> 133 项
    </p>
  </div>
  <div class="search-box p-2">
    <input type="text" class="form-control" placeholder="请输入关键字" />
  </div>
  <ul class="list mb-0 overflow-auto">
    <li
      *ngFor="let item of showList; trackBy: trackByItem"
      class="list-item text-truncate list-group-item-action">
      {{ item.value }}
    </li>
  </ul>
</div>
```

transfer-panel.component.scss
```scss
.transfer-panel {
  user-select: none;
  .head {
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid #f0f0f0;
  }
  .list {
    height: 176px;
    .list-item {
      cursor: pointer;
      padding: 10px;
      transition: all .2s;
    }
    .active {
      color: #fff;
      background-color: #007bff;
    }
  }
}

```

transfer-panel.component.ts
```typescript
import {Component, OnInit, ChangeDetectionStrategy, Input, OnChanges, SimpleChanges, Output, EventEmitter} from '@angular/core';
import {TransferItem} from '../types';
@Component({
  selector: 'app-transfer-panel',
  templateUrl: './transfer-panel.component.html',
  styleUrls: ['./transfer-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TransferPanelComponent implements OnInit, OnChanges {
  showList: TransferItem[] = [];
  constructor() {

  }

  ngOnInit(): void {
    this.setList();
  }
   setList() {
      this.showList = [];
      const prefix = 'item' + Date.now().toString().slice(-3);
      for (let i = 0; i < 20; i++) {
        this.showList.push({
          key: prefix + '_' + i,
          value: `${prefix}${i + 1}`,
          checked: i % 6 === 0
        });
      }
  }
}

```

types.ts
```typescript
export interface TransferItem {
  key: string;
  value: string;
  checked?: boolean;
}

```
