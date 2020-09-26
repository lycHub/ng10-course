import {ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'xm-rate',
  templateUrl: './rate.component.html',
  styleUrls: ['./rate.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class RateComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
