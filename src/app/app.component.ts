import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
 /* template: `
    <b>inline mode</b>
    <h1 class="title">{{ title }}</h1>
    <p>name: {{ heroName }}</p>
  `,
  styles: [`
    b {
        color: #6f42c1;
    }
  `]*/
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'hero';
  isPrimary = true;
  btnCls = 'btn btn-primary';
  btnCls2 = ['btn', 'btn-info'];
  btnCls3 = {
    btn: true,
    'btn-secondary': true
  };

  style1 = 'color: red; border: 1px solid';
  // style2 = ['color', '#BF3349'];
  style2 = ['width', '100px']; // 有问题 ？
  style3 = {
    color: '#BF3349',
    backgroundColor: '#E0FF95' // background-color 也可以
  };
}
