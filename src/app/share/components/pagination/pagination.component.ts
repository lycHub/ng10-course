import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import { clamp } from 'lodash';

type PageItemType = 'page' | 'prev' | 'next' | 'prev5' | 'next5';
interface PageItem {
  type: PageItemType;
  num?: number;
  disabled?: boolean;
}

@Component({
  selector: 'xm-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit, OnChanges {
  @Input() total = 0;
  @Input() pageNum = 1;
  @Input() pageSize = 10;
  @Output() changed = new EventEmitter<number>();
  lastNum = 0;
  listOfPageItems: PageItem[] = [];
  constructor() { }

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges): void {
    this.lastNum = Math.ceil(this.total / this.pageSize) || 1;
    this.listOfPageItems = this.getListOfPageItems(this.pageNum, this.lastNum);
    // console.log('listOfPageItems', this.listOfPageItems);
  }

  inputVal(num: number): void {
    if (num > 0) {
      this.pageClick({
        type: 'page',
        num
      });
    }
  }

  pageClick({ type, num, disabled }: PageItem): void {
    if (!disabled) {
      let newPageNum = this.pageNum;
      if (type === 'page') {
        newPageNum = num;
      } else {
        const diff: any = {
          next: 1,
          prev: -1,
          prev5: -5,
          next5: 5
        };
        newPageNum += diff[type];
      }
      // console.log('newPageNum', newPageNum);
      this.changed.emit(clamp(newPageNum, 1, this.lastNum));
    }
  }

  private getListOfPageItems(pageNum: number, lastNum: number): PageItem[] {
    if (lastNum <= 9) {
      return concatWithPrevNext(generatePage(1, this.lastNum), pageNum, lastNum);
    } else {
      let listOfRange = [];
      const prevFiveItem = {
        type: 'prev5'
      };
      const nextFiveItem = {
        type: 'next5'
      };
      const firstPageItem = generatePage(1, 1);
      const lastPageItem = generatePage(lastNum, lastNum);
      if (pageNum < 4) {
        listOfRange = [...generatePage(2, 5), nextFiveItem];
      } else if (pageNum > lastNum - 4) {
        listOfRange = [prevFiveItem, ...generatePage(lastNum - 4, lastNum - 1)];
      } else {
        listOfRange = [prevFiveItem, ...generatePage(pageNum - 2, pageNum + 2), nextFiveItem];
      }
      return concatWithPrevNext([...firstPageItem, ...listOfRange, ...lastPageItem], pageNum, lastNum);
    }
  }
}


function generatePage(start: number, end: number): PageItem[] {
  const list = [];
  for (let i = start; i <= end; i++) {
    list.push({
      num: i,
      type: 'page'
    });
  }
  return list;
}

function concatWithPrevNext(listOfPage: PageItem[], pageNum: number, lastNum: number): PageItem[] {
  return [
    {
      type: 'prev',
      disabled: pageNum === 1
    },
    ...listOfPage,
    {
      type: 'next',
      disabled: pageNum === lastNum
    }
  ];
}
