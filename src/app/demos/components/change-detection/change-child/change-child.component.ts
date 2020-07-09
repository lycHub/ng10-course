import {ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-change-child',
  templateUrl: './change-child.component.html',
  styles: [
    `
          .change-child {
              width: 600px;
              height: 350px;
              background-color: #c16a56;
          }

          .change-child h2 {
              color: #9cff61;
          }
    `
  ]
})
export class ChangeChildComponent implements OnInit, OnChanges {
  childName = 'VN';
  position = '下';
  @Input() arms = '多兰剑';
  @Output() childInit = new EventEmitter<void>();
  constructor(private cdr: ChangeDetectorRef) {
    this.cdr.detach();
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('changes', changes);
    this.cdr.reattach();
    setTimeout(() => {
      // this.cdr.detach();
    }, 0);
  }

  ngOnInit(): void {
    // this.childInit.emit();
    setTimeout(() => {
      this.childName = 'EZ';
    }, 3000);
  }

}
