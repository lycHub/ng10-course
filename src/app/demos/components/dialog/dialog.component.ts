import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
  // inputs: ['show'],
  // outputs: ['closed']
})
export class DialogComponent implements OnInit {
  // show = false;
  // closed = new EventEmitter<void>();
  @Input('visible') show = false;
  @Input() title = '标题...';
  @Input() confirmLable = '确定';
  @Input() cancelLabel = '取消';
  @Output('hide') closed = new EventEmitter<void>();
  @Output() backdropClick = new EventEmitter<void>();
  @Output() confirm = new EventEmitter<void>();
  constructor() { }

  ngOnInit(): void {
    this.confirm.subscribe(value => {
      console.log('内部监听 confirm', value);
    });
  }

  /*onBackdropClick() {
    console.log('backdropClick');
  }*/

  onConfirm() {
    // this.confirm.next('next a value');
    this.confirm.emit();
  }
  onClose() {
    // event.stopPropagation();
    // this.show = false;
    this.closed.emit();
  }
}
