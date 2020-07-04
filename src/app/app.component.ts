import {Component} from '@angular/core';
import {TransferItem} from './components/transfer-panel/types';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  list: TransferItem[] = [];
  constructor() {
    this.setList();
  }

  onChanged(selecteds: TransferItem[]) {
    console.log('onChanged', selecteds);
  }
  private setList() {
    this.list = [];
    const prefix = 'item' + Date.now().toString().slice(-3);
    for (let i = 0; i < 20; i++) {
      this.list.push({
        key: prefix + '_' + i,
        value: `${prefix}${i + 1}`,
        checked: i % 6 === 0
      });
    }
  }
}
