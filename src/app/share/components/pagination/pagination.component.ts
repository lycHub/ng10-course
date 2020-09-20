import {Component, Input, OnInit} from '@angular/core';
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
export class PaginationComponent implements OnInit {
  @Input() total = 313;
  @Input() pageNum = 1;
  @Input() pageSize = 7;
  private lastNum = 0;
  listOfPageItems: PageItem[] = [];
  constructor() { }

  ngOnInit(): void {
    this.lastNum = Math.ceil(this.total / this.pageSize);
    this.listOfPageItems = this.getListOfPageItems(this.pageNum, this.lastNum);
    console.log('listOfPageItems', this.listOfPageItems);
  }

  private getListOfPageItems(pageNum: number, lastNum: number): PageItem[] {
    if (lastNum <= 9) {
      return concatWithPrevNext(generatePage(1, this.lastNum), pageNum, lastNum);
    } else {
      let listOfRange = [];
      const prevFiveItem = {
        type: 'prev_5'
      };
      const nextFiveItem = {
        type: 'next_5'
      };
      const firstPageItem = generatePage(1, 1);
      const lastPageItem = generatePage(lastNum, lastNum);
      if (pageNum < 4) {
        listOfRange = [...generatePage(2, 5), nextFiveItem];
      } else if (pageNum > lastNum - 4) {
        listOfRange = [prevFiveItem, ...generatePage(lastNum - 4, lastNum + 1)];
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
