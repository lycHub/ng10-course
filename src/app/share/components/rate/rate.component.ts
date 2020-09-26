import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'xm-rate',
  templateUrl: './rate.component.html',
  styleUrls: ['./rate.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class RateComponent implements OnInit {
  @Input() count = 5;
  starArray: number[] = [];
  private hoverValue = 0;
  private actualValue = 0;
  private hasHalf = false;
  rateItemStyles: string[] = [];
  @Output() changed = new EventEmitter<number>();
  constructor() { }

  ngOnInit(): void {
    this.updateStarArray();
  }

  rateHover(isHalf: boolean, index: number): void {
    if (this.hoverValue === index + 1 && isHalf === this.hasHalf) {
      console.log('ignore');
      return;
    }
    this.hoverValue = index + 1;
    this.hasHalf = isHalf;
    // console.log('hoverValue', this.hoverValue);
    this.updateStarStyle();
  }

  rateClick(isHalf: boolean, index: number): void {
    // console.log('rateClick', isHalf);
    this.hoverValue = index + 1;
    this.hasHalf = isHalf;
    this.setActualValue(isHalf ? index + 0.5 : this.hoverValue);
    this.updateStarStyle();
  }

  private setActualValue(value: number): void {
    if (this.actualValue !== value) {
      this.actualValue = value;
      this.changed.emit(value);
    }
  }
  rateLeave(): void {
    this.hasHalf = !Number.isInteger(this.actualValue);
    this.hoverValue = Math.ceil(this.actualValue);
    this.updateStarStyle();
  }

  private updateStarArray(): void {
    this.starArray = Array(this.count).fill(0).map((item, index) => index);
    // console.log('starArray', this.starArray);
  }

  private updateStarStyle(): void {
    this.rateItemStyles = this.starArray.map(index => {
      const base = 'xm-rate-item';
      const value = index + 1;
      let cls = '';
      if (value < this.hoverValue || (!this.hasHalf && value === this.hoverValue)) {
        cls += base + '-full';
      } else if (this.hasHalf && value === this.hoverValue) {
        cls += base + '-half';
      }
      return base + ' ' + cls;
    });
  }
}
