import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
@Component({
  selector: 'app-example',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
  // providers: [MobileService]
})
export class ExampleComponent implements OnInit {
  constructor() {
  }

  ngOnInit(): void {

  }

  onConfirm(event) {
    console.log('onConfirm', event);
  }
}
