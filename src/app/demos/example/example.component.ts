import {
  Component,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import {combineLatest, concat, forkJoin, fromEvent, interval, merge, of, partition, race, range, timer, zip} from 'rxjs';
import {
  buffer,
  bufferCount, bufferTime, bufferToggle, bufferWhen,
  combineAll,
  concatAll, concatMap, concatMapTo,
  endWith, exhaust, exhaustMap, groupBy,
  map,
  mapTo,
  mergeAll, mergeMap, mergeMapTo, mergeScan, pairwise,
  pluck, reduce, scan,
  startWith, switchMap,
  take, toArray,
  withLatestFrom
} from 'rxjs/operators';


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
    const clicks = fromEvent(document, 'click');
    const result = clicks.pipe(switchMap((ev) => interval(1000)));
    result.subscribe(x => console.log(x));

  }
  newObservable() {

  }
  mapTo(result: string | number) {

  }
}
