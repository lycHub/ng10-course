import {
  Component,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import {MobileService} from '../components/test-service/mobile/mobile.service';
import {fromEvent} from 'rxjs';
import {map, scan, throttleTime} from 'rxjs/operators';

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
    fromEvent(document, 'click')
      .pipe(
        throttleTime(1000),
        map((event: MouseEvent) => event.clientX),
        scan((count, clientX) => count + clientX, 0)
      )
      .subscribe(count => console.log(count));
  }
}
