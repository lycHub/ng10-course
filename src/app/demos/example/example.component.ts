import {
  Component,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import {interval, Observable} from 'rxjs';

const observable1 = interval(500);
const observable2 = interval(300);

const subscription = observable1.subscribe(x => console.log('first: ' + x));
const childSubscription = observable2.subscribe(x => console.log('second: ' + x));

subscription.add(childSubscription);

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
    /*const observable$ = interval(1000);
    const subscription = observable$.subscribe(x => console.log(x));
    setTimeout(() => {
      subscription.unsubscribe();
    }, 3000);*/
  }
  cancelObservable() {
    subscription.unsubscribe();
  }
}
