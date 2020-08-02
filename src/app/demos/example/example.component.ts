import {
  Component,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import {
  combineLatest,
  concat,
  EMPTY,
  forkJoin, from,
  fromEvent,
  interval,
  merge,
  of,
  partition,
  race,
  range,
  Subject,
  throwError,
  timer,
  zip
} from 'rxjs';
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
    const observable = from([1, 2, 3]);
    const subject = new Subject<number>();
    subject.subscribe({
      next: (v) => console.log(`observerA: ${v}`)
    });
    subject.subscribe({
      next: (v) => console.log(`observerB: ${v}`)
    });
    observable.subscribe(subject);
  }
  newObservable() {

  }
  mapTo(result: string | number) {

  }
}
