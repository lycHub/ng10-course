import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-crisis-list',
  template: `
    <h2>CRISIS CENTER</h2>
    <p>Get your crisis here</p>
  `,
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CrisisListComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
