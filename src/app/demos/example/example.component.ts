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
  concatAll, debounce, debounceTime, delay, distinct, distinctUntilChanged, distinctUntilKeyChanged, elementAt,
  endWith, filter, first, ignoreElements, last,
  map,
  mapTo,
  mergeAll, mergeMap,
  pluck, retry, retryWhen, sample, sampleTime, single, skip, skipLast, skipUntil, skipWhile,
  startWith,
  take, takeLast, takeUntil, takeWhile, tap, throttle, throttleTime,
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
    const source = interval(1000);
    const example = source.pipe(
      map(val => {
        if (val > 5) {
          // 错误将由 retryWhen 接收
          throw val;
        }
        return val;
      }),
      retryWhen(errors =>
        errors.pipe(
          // 输出错误信息
          tap(val => console.log(`Value ${val} 太大了!`)),
          // 3秒后重试
          delay(3000)
        )
      )
    );
    const subscribe = example.subscribe(
      val => console.log(val),
      error => console.error('err ', error)
    );
  }
  newObservable() {

  }
  mapTo(result: string | number) {

  }
}
