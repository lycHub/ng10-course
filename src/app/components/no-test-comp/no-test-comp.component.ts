import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-no-test-comp',
  template: `
    <p>
      no-test-comp works!
    </p>
  `,
  styles: [
  ]
})
export class NoTestCompComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
