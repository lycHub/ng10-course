import {Component, OnInit, ChangeDetectionStrategy, Input} from '@angular/core';

@Component({
  selector: 'app-spin',
  template: `
    <div class="d-flex justify-content-center align-items-center h-spin-overlay" *ngIf="show">
      <div class="spinner-border text-primary h-spin" role="status"></div>
    </div>
  `,
  styles: [
    `
          .h-spin-overlay {
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
              height: 100%;
              background-color: rgba(0, 0, 0, .2);
          }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpinComponent implements OnInit {
  @Input() show = false;
  constructor() { }

  ngOnInit(): void {
  }

}
