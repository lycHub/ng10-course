import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'xm-message-item',
  templateUrl: './message-item.component.html',
  styleUrls: ['./message-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessageItemComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
