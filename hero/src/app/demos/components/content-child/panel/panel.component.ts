import {Component, ElementRef, OnInit} from '@angular/core';

@Component({
  selector: 'app-content-panel',
  templateUrl: './panel.component.html',
  styles: [
  ]
})
export class ContentPanelComponent implements OnInit {

  constructor(readonly el: ElementRef) { }

  ngOnInit(): void {
  }

}
