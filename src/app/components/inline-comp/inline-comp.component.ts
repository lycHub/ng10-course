import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inline-comp',
  template: `
    <p>
      inline-comp works!
    </p>
  `,
  styles: [
  ]
})
export class InlineCompComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
