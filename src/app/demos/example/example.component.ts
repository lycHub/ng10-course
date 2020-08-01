import {
  Component,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import {combineLatest, concat, EMPTY, forkJoin, fromEvent, interval, merge, of, partition, race, range, throwError, timer, zip} from 'rxjs';
import {
  audit,
  auditTime,
  catchError,
  combineAll,
  concatAll,
  count,
  debounce,
  debounceTime,
  defaultIfEmpty,
  delay,
  delayWhen,
  distinct,
  distinctUntilChanged,
  distinctUntilKeyChanged,
  elementAt,
  endWith, every,
  filter, find, findIndex,
  first,
  ignoreElements, isEmpty,
  last,
  map,
  mapTo,
  max,
  mergeAll,
  mergeMap,
  min,
  pluck,
  retry,
  retryWhen,
  sample,
  sampleTime,
  single,
  skip,
  skipLast,
  skipUntil,
  skipWhile,
  startWith,
  take,
  takeLast,
  takeUntil,
  takeWhile,
  tap,
  throttle,
  throttleTime,
  timeInterval,
  timeout,
  timeoutWith,
  timestamp,
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
    of(1, 2, 3, 4, 5, 6).pipe(
      every(x => x < 7),
    )
      .subscribe(x => console.log(x));
  }
  newObservable() {

  }
  mapTo(result: string | number) {

  }
}
