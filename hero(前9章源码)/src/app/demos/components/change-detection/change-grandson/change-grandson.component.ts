import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-change-grandson',
  templateUrl: './change-grandson.component.html',
  styles: [
    `
          .change-grand-son {
              width: 600px;
              height: 350px;
              background-color: #3a35c1;
          }

          .change-grand-son h2 {
              color: #e44b51;
          }

          .change-grand-son p {
              color: #fa6993;
          }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChangeGrandsonComponent implements OnInit, OnChanges {
  @Input() position: '上' | '下';
  grandSonName = '河蟹';
  constructor(private cdr: ChangeDetectorRef) { }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('changes position', changes);
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.grandSonName = 'f6';
      this.cdr.markForCheck();
      // this.cdr.detectChanges();
    }, 3000);
  }

}
