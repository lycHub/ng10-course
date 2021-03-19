import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-manage-heroes',
  template: `
    <p>
      manage-heroes works!
    </p>
  `,
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ManageHeroesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
