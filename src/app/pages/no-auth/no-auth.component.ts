import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-no-auth',
  template: `
    <p>
      no-auth works!
    </p>
  `,
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NoAuthComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
