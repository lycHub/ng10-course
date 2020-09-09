import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-manage-crises',
  template: `
    <p>
      manage-crises works!
    </p>
  `,
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ManageCrisesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
