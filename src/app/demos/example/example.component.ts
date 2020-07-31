import {
  Component,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import {combineLatest, concat, forkJoin, fromEvent, interval, merge, of, partition, race, range, timer, zip} from 'rxjs';
import {
  audit,
  auditTime,
  combineAll,
  concatAll, debounce, debounceTime, distinct, distinctUntilChanged, distinctUntilKeyChanged, elementAt,
  endWith, filter, first, ignoreElements, last,
  map,
  mapTo,
  mergeAll,
  pluck, sample, sampleTime, single, skip, skipLast, skipUntil, skipWhile,
  startWith,
  take, takeLast, takeUntil, takeWhile, throttle, throttleTime,
  withLatestFrom
} from 'rxjs/operators';

interface Person {
  age: number;
  name: string;
}

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
    const interval$ = interval(500);
    const result = interval$.pipe(throttleTime(2000));
    result.subscribe(x => console.log(x));
  }
  newObservable() {

  }
  mapTo(result: string | number) {

  }
}
