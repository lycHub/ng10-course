import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'hero';
  showModal = false;
  onConfirm() {
    console.log('接收 onConfirm');
  }
  onClose() {
    this.showModal = false;
  }
}
