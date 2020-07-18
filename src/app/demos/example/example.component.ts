import {
  Component,
  OnInit,
  ViewEncapsulation
} from '@angular/core';

@Component({
  selector: 'app-example',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ExampleComponent implements OnInit {
  constructor() {
  }

  ngOnInit(): void {

  }
}
