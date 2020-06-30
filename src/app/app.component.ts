import {Component, ViewChild} from '@angular/core';
import {NgModel} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  inputVal = '';
  inFormVal = 'form val';
  expandVal = '';
  @ViewChild(NgModel) private ngModel: NgModel;

  getVal() {
    // console.log('getVal', this.ngModel);
    console.log('viewModel', this.ngModel.viewModel);
  }
  setVal() {
    // this.ngModel.viewToModelUpdate('set new val');
    this.inputVal = '改';
  }
}
