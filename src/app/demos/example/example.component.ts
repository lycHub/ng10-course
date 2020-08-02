import {
  Component,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import {
  AsyncSubject,
  BehaviorSubject,
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
  range, ReplaySubject,
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
  sampleTime, share,
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
import set = Reflect.set;

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
    const source = interval(1000).pipe(take(5), share());
    source.subscribe(value => console.log('observable1: ' + value));
    setTimeout(() => {
      source.subscribe(value => console.log('observable2: ' + value));
    }, 2000);
  }
  newObservable() {

  }
  mapTo(result: string | number) {

  }
}
