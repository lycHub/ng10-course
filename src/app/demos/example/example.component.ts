import {
  Component,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import {combineLatest, concat, forkJoin, fromEvent, interval, merge, of, partition, race, range, timer, zip} from 'rxjs';
import {combineAll, concatAll, endWith, map, mapTo, mergeAll, pluck, startWith, take, withLatestFrom} from 'rxjs/operators';


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
    const clicks = fromEvent(document, 'click').pipe(pluck('clientX'));
    const interval$ = interval(1000);
    // const result = clicks.pipe(withLatestFrom(interval$));
    const result = interval$.pipe(withLatestFrom(clicks));
    result.subscribe(x => console.log(x));
  }
  newObservable() {

  }
  mapTo(result: string | number) {

  }
}
