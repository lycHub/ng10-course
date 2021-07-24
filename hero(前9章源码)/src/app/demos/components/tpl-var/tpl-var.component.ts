import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tpl-var',
  templateUrl: './tpl-var.component.html',
  styles: [
  ]
})
export class TplVarComponent implements OnInit {
  fontSize = 16;
  constructor() { }

  ngOnInit(): void {
  }

  callPhone(value: string) {
    console.log('callPhone', value);
  }
}
