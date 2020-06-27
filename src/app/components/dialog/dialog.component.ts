import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  onClick(str: string, event: MouseEvent): void {
    console.log('onClick', str);
    console.log('onClick event', event.target);
  }

  clickParent() {
    console.log('clickParent');
  }
  clickChild(event: MouseEvent) {
    event.stopPropagation();
    console.log('clickChild');
  }

  onInput(event: KeyboardEvent) {
    console.log('onInput', (event.target as HTMLInputElement).value);
  }
}
