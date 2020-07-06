import {Component, ElementRef, OnInit} from '@angular/core';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styles: [
  ]
})
export class PanelComponent implements OnInit {
  readonly name = '张三';
  constructor(readonly el: ElementRef) { }

  ngOnInit(): void {}

}
