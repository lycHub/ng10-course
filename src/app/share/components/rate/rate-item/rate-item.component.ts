import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'xm-rate-item',
  templateUrl: './rate-item.component.html',
  styleUrls: ['./rate-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RateItemComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
