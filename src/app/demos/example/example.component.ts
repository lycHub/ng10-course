import {
  Component,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import {combineLatest, concat, forkJoin, fromEvent, interval, merge, of, partition, race, range, throwError, timer, zip} from 'rxjs';
import {
  audit,
  auditTime, catchError,
  combineAll,
  concatAll, debounce, debounceTime, delay, delayWhen, distinct, distinctUntilChanged, distinctUntilKeyChanged, elementAt,
  endWith, filter, first, ignoreElements, last,
  map,
  mapTo,
  mergeAll, mergeMap,
  pluck, retry, retryWhen, sample, sampleTime, single, skip, skipLast, skipUntil, skipWhile,
  startWith,
  take, takeLast, takeUntil, takeWhile, tap, throttle, throttleTime, timeInterval, timeout, timeoutWith, timestamp,
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
    const seconds = interval(1000);
    const minutes = interval(500);

// seconds太慢将会推送minutes流
    seconds.pipe(timeoutWith(900, minutes))
      .subscribe(value => console.log(value));
  }
  newObservable() {

  }
  mapTo(result: string | number) {

  }
}
