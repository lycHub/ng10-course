import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  Component,
  DoCheck,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges
} from '@angular/core';

@Component({
  selector: 'app-life-cycle',
  templateUrl: './life-cycle.component.html',
  styles: [
  ]
})
export class LifeCycleComponent implements OnChanges, OnInit, DoCheck, AfterContentInit, AfterContentChecked, AfterViewChecked, AfterViewInit, AfterViewChecked, OnDestroy {
  @Input() title = 'def';
  constructor() {
    console.log('constructor', this.title);
  }

  onInput() {

  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('ngOnChanges', this.title);
  }


  ngOnInit(): void {
    console.log('ngOnInit', this.title);
  }

  ngDoCheck(): void {
    console.log('ngDoCheck');
  }



  ngAfterContentInit(): void {
    console.log('ngAfterContentInit');
  }

  ngAfterContentChecked(): void {
    console.log('ngAfterContentChecked');
  }

  ngAfterViewInit(): void {
    console.log('ngAfterViewInit');
  }

  ngAfterViewChecked(): void {
    console.log('ngAfterViewChecked');
  }

  ngOnDestroy(): void {
    console.log('destroy');
  }
}
