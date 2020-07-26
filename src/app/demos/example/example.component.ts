import {
  Component,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import {combineLatest, concat, forkJoin, fromEvent, interval, merge, of, partition, race, range, timer, zip} from 'rxjs';
import {map, mapTo, take} from 'rxjs/operators';


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
    const age$ = of<number>(27, 25, 29);
    const name$ = of<string>('Foo', 'Bar', 'Beer');
    const isDev$ = of<boolean>(true, true, false);
    zip(age$, name$, isDev$).subscribe(x => console.log(x));
  }
  newObservable() {

  }
  mapTo(result: string | number) {

  }
}
