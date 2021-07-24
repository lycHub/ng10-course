import {ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges, TemplateRef} from '@angular/core';
import {Direction, TransferItem} from './types';
import cloneDeep from 'lodash.clonedeep';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TransferComponent implements OnInit, OnChanges {
  @Input() sourceData: TransferItem[];
  @Input() search = false;
  @Input() customTpl: TemplateRef<any>;
  leftDatas: TransferItem[] = [];
  rightDatas: TransferItem[] = [];
  leftShowList: TransferItem[] = [];
  rightShowList: TransferItem[] = [];
  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    const { sourceData } = changes;
    if (sourceData && sourceData.currentValue) {
      sourceData.currentValue.forEach(item => {
        if (!item.direction || item.direction === 'left') {
          item.direction = 'left';
          this.leftDatas.push(item);
          this.leftShowList.push(item);
        } else {
          item.direction = 'right';
          this.rightDatas.push(item);
          this.rightShowList.push(item);
        }
      });
    }
  }
  ngOnInit(): void {
  }

  to(direction: Direction) {
    if (direction === 'left') {
      this.trueMove('right', 'left');
    } else {
      this.trueMove('left', 'right');
    }
  }

  private trueMove(from: Direction, to: Direction) {
    const moveList: TransferItem[] = cloneDeep(this[from + 'ShowList'])
      .filter(item => item.checked)
      .map(item => {
        item.checked = false;
        return item;
      });
    // console.log('moveList', moveList);
    this[to + 'ShowList'] = this[to + 'ShowList'].concat(moveList);
    // console.log('from', this[from]);
    this[from + 'ShowList'] = this[from + 'ShowList'].filter(item => !item.checked);

    this[to + 'Datas'] = this[to + 'Datas'].concat(moveList);
    this[from + 'Datas'] = this[from + 'Datas'].filter(item => {
      return moveList.findIndex(mItem => mItem.key === item.key) === -1;
    });
  }

  onFiltered(value: string, direction: Direction) {
    this[direction + 'ShowList'] = this[direction + 'Datas'].filter(item => item.value.includes(value));
  }

  onSelect(index: number, direction: Direction) {
    this[direction + 'ShowList'][index].checked = !this[direction + 'ShowList'][index].checked;
    this[direction + 'ShowList'] = this[direction + 'ShowList'].slice();
    // console.log(this.leftDatas);
  }

  disableBtn(direction: Direction) {
    const targetDatas = direction === 'left' ? this.rightDatas : this.leftDatas;
    return targetDatas.findIndex(item => item.checked) === -1;
  }
}
