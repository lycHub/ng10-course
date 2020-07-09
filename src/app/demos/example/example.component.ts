import { Component, OnInit } from '@angular/core';
import {TransferItem} from '../components/transfer-panel/types';

@Component({
  selector: 'app-example',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.scss']
})
export class ExampleComponent implements OnInit {
  showLife = true;

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
