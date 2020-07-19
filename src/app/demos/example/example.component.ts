import {
  Component,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import {MobileService} from '../components/test-service/mobile/mobile.service';

@Component({
  selector: 'app-example',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.scss'],
  encapsulation: ViewEncapsulation.None,
  // providers: [MobileService]
})
export class ExampleComponent implements OnInit {
  constructor() {
  }

  ngOnInit(): void {

  }
}
