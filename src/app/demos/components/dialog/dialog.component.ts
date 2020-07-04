import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  // inputs: ['show'],
  // outputs: ['closed']
})
export class DialogComponent implements OnInit {
  // show = false;
  // closed = new EventEmitter<void>();
  @Input('visible') show = false;
  @Input() title = '';
  @Input() confirmLable = '确定';
  @Input() cancelLabel = '取消';
  @Output('hide') closed = new EventEmitter<void>();
  @Output() backdropClick = new EventEmitter<void>();
  @Output() confirm = new EventEmitter<void>();
  constructor() { }

  ngOnInit(): void {
  }

  /*onBackdropClick() {
    console.log('backdropClick');
  }*/

  onConfirm() {
    this.confirm.emit();
  }
  onClose() {
    // event.stopPropagation();
    // this.show = false;
    this.closed.emit();
  }
}
