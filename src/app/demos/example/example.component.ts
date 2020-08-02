import {
  Component,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import {
  AsyncSubject,
  BehaviorSubject,
  combineLatest,
  concat, ConnectableObservable,
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
  min, multicast,
  pluck, publish, publishBehavior, publishLast, publishReplay, refCount,
  retry,
  retryWhen,
  sample,
  sampleTime, share, shareReplay,
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
    const source = range(2, 8);
    const refCounted = source.pipe(shareReplay(2, 3000));
    console.log('observerA subscribed');
    refCounted.subscribe({
      next: (v) => console.log(`observerA: ${v}`)
    });

    setTimeout(() => {
      // 2秒后再增加一个subscriber
      console.log('observerB subscribed');
      refCounted.subscribe({
        next: (v) => console.log(`observerB: ${v}`)
      });
    }, 4000);
  }
  newObservable() {

  }
  mapTo(result: string | number) {

  }
}
