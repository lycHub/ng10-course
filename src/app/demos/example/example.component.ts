import {
  Component,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import {Observable} from 'rxjs';

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
    const observable$ = new Observable(subscriber => {
      // console.log('aaa');
      subscriber.next(1);
      subscriber.next(2);
      subscriber.next(3);
      // subscriber.error(new Error('出错了'));
      subscriber.next(555);
      subscriber.complete();
      subscriber.next(444);
    });
    /*observable$.subscribe(res => {
      console.log('res', res);
    }, error => {
      console.error('error', error);
    }, () => {
      console.log('complete');
    });*/
    observable$.subscribe({
      next(res) {
        console.log('res', res);
      },
      error(error) {
        console.error('error', error);
      },
      complete() {
        console.log('complete');
      }
    });
  }
  cancelObservable() {

  }
}
