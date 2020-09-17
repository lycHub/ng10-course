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
  @Input() total = 90;
  @Input() pageNum = 1;
  @Input() pageSize = 10;
  private lastNum = 0;
  listOfPageItems: PageItem[] = [];
  constructor() { }

  ngOnInit(): void {
    this.lastNum = Math.ceil(this.total / this.pageSize);
    this.listOfPageItems = this.getListOfPageItems(this.pageNum, this.lastNum);
    console.log('listOfPageItems', this.listOfPageItems);
  }

  private getListOfPageItems(pageNum: number, lastNum: number): PageItem[] {
    return concatWithPrevNext(generatePage(1, this.lastNum), pageNum, lastNum);
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
