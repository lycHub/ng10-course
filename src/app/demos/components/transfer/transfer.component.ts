import {ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
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
  leftDatas: TransferItem[] = [];
  rightDatas: TransferItem[] = [];
  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    const { sourceData } = changes;
    if (sourceData && sourceData.currentValue) {
      sourceData.currentValue.forEach(item => {
        if (!item.direction || item.direction === 'left') {
          item.direction = 'left';
          this.leftDatas.push(item);
        } else {
          item.direction = 'right';
          this.rightDatas.push(item);
        }
      });
    }
  }
  ngOnInit(): void {
  }

  to(direction: Direction) {
    if (direction === 'left') {
      this.trueMove('rightDatas', 'leftDatas');
    } else {
      this.trueMove('leftDatas', 'rightDatas');
    }
  }

  private trueMove(
    from: 'leftDatas' | 'rightDatas',
    to: 'leftDatas' | 'rightDatas'
  ) {
    const moveList: TransferItem[] = cloneDeep(this[from])
      .filter(item => item.checked)
      .map(item => {
        item.checked = false;
        return item;
      });
    console.log('moveList', moveList);
    this[to] = this[to].concat(moveList);
    // console.log('from', this[from]);
    this[from] = this[from].filter(item => !item.checked);
  }

  onSelect(index: number, direction: Direction) {
    this[direction + 'Datas'][index].checked = !this[direction + 'Datas'][index].checked;
    this[direction + 'Datas'] = this[direction + 'Datas'].slice();
    // console.log(this.leftDatas);
  }

  disableBtn(direction: Direction) {
    const targetDatas = direction === 'left' ? this.rightDatas : this.leftDatas;
    return targetDatas.findIndex(item => item.checked) === -1;
  }
}
