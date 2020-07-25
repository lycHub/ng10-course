import {
  Component,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import {interval, Observable, of} from 'rxjs';
import {mapTo} from 'rxjs/operators';

function map(source: Observable<string>, callback: (item: string) => string) {
  return new Observable(observer => {
    return source.subscribe(
      value => {
        try{
          observer.next(callback(value));
        } catch (e) {
          observer.error(e);
        }
      },
      (err) => { observer.error(err); },
      () => { observer.complete(); }
    );
  });
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

  }
  newObservable() {
    const people = of('Jerry', 'Anna');
    const helloPeople$ = map(people, (item) => item + ' Hello~');
    helloPeople$.subscribe(res => {
      console.log('res', res);
    });
  }
  mapTo(result: string | number) {
    const source$ = interval(1000);
    const newest$ = source$.pipe(mapTo(result));
    newest$.subscribe(res => {
      console.log('res', res);
    });
  }
}
