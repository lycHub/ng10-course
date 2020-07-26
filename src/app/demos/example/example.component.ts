import {
  Component,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import {empty, from, fromEvent, iif, interval, Observable, of, range, throwError, timer} from 'rxjs';
import {map, mapTo} from 'rxjs/operators';


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
    const err$ = throwError(new Error('fail'));

    err$.subscribe(res => {
      console.log('res', res);
    }, error => {
      console.error(error);
    }, () => console.log('complete'));
  }
  newObservable() {

  }
  mapTo(result: string | number) {

  }
}
