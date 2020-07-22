import {
  Component,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import {from, concat, fromEvent, interval, Observable} from 'rxjs';
import {filter, map, reduce, tap} from 'rxjs/operators';

const sub = interval(1000).subscribe(res => {
  console.log('interval', res);
});

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

  }

  newPromise() {
    const p = new Promise(resolve => {
      console.log('initial a promise'); // 立即触发
      resolve(['a', 'b', 'c']);
    }).then(res => {
      console.log('第一个then');
      return res;
    }).then(res => {
      console.log('第2个then');
      return res;
    });
  }
  newObservable() {
    const o = new Observable(subscriber => {
      console.log('initial a newObservable'); // 不触发
      subscriber.next(['a', 'b', 'c']);
    }).pipe(
      map(res => {
        console.log('第一个map');
        return res;
      }),
      map(res => {
        console.log('第2个map');
        return res;
      })
    );
  }
  cancelObservable() {
    sub.unsubscribe();
  }
  concat() {
    const arr$ = from([2, 11, 44]);
    const arr2$ = from([1, 6, 4]);
    concat(arr$, arr2$).pipe(
      reduce((s, v) => s + v, 0),
      tap(item => {
        console.log('tap', item);
      })
    ).subscribe(res => {
      console.log('concat', res);
    });
  }
}
