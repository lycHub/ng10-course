types.ts
```typescript
export type Direction = 'left' | 'right';
export interface TransferItem {
  checked: boolean;
  key: string;
  value: string;
  direction?: Direction;
}
export interface TransferResult {
  left: TransferItem[];
  right: TransferItem[];
}

```

transfer.ts
```typescript
import {Direction, TransferItem, TransferResult} from './types';
@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TransferComponent implements OnInit, OnChanges {
  @Input() dataSource: TransferItem[] = [];
  leftDatas: TransferItem[] = [];
  rightDatas: TransferItem[] = [];
  @Output() changed = new EventEmitter<TransferResult>();
  constructor(private cdr: ChangeDetectorRef) { }

  ngOnChanges(changes: SimpleChanges): void {
    const { dataSource } = changes;
    if (dataSource && dataSource.currentValue) {
      dataSource.currentValue.forEach(item => {
        if (!item.direction || item.direction === 'left') {
          item.direction = 'left';
          this.leftDatas.push(item);
        } else {
          item.direction = 'right';
          this.rightDatas.push(item);
        }
      });
      // console.log(this.leftDatas);
      // console.log(this.rightDatas);
    }
  }

  ngOnInit(): void {

  }
}

```

transfer.html
```angular2html
<div class="transfer">
  <div class="panel-wrap">
    <app-transfer-panel [list]="leftDatas"></app-transfer-panel>
  </div>
  <div class="operations">
    <button class="btn btn-primary">&gt;</button>
    <button class="btn btn-primary">&lt;</button>
  </div>
  <div class="panel-wrap">
    <app-transfer-panel [list]="rightDatas"></app-transfer-panel>
  </div>
</div>

```

transfer.scss
```scss
.transfer {
  display: flex;
  align-items: center;
  .panel-wrap {
    width: 200px;
  }
  .operations {
    margin: 0 10px;
    .btn {
      display: block;
      &:first-child {
        margin-bottom: 10px;
      }
    }
  }
}

```
