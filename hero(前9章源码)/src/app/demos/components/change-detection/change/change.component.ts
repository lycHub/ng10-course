import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-change',
  templateUrl: './change.component.html',
  styles: [
    `
      .change {
          width: 800px;
          height: 400px;
          background-color: #6f42c1;
      }
      .change h2 {
          color: #fff;
      }
      .change p {
          color: #fff;
          border: 1px solid #17a2b8;
      }
    `
  ]
})
export class ChangeComponent implements OnInit {
  heroName = '卡特';
  arms = '多兰剑';
  constructor() { }

  ngOnInit(): void {
  }

}
