import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-name-editor',
  template: `
    <button class="btn btn-primary" (click)="updateName()">set name</button>
    <label>
      Name:
      <input type="text" [formControl]="name" />
    </label>
    <p>value: {{ name.value }}</p>
  `,
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NameEditorComponent implements OnInit {
  name = new FormControl('aaaa');
  constructor() { }

  ngOnInit(): void {
  }

  updateName() {
    this.name.setValue('Nancy');
  }
}
