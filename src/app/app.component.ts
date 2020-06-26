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
  user = 'madao';
  madaoPic = '../assets/images/madao.jpg';
  colspan = 3;
  isDisabled = true;
  customTitle = 'custom-title';
  customTitle2 = '又是个title2';
  customTitle3 = '又是个title3';


  user2 = {
    name: 'madao',
    pic: this.madaoPic
  };
}
