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
  heroName = '盖伦';
  price = 6300;

  gender = 0;

  get job(): string {
    return '战士';
  }

  getVal(): number {
    return 33;
  }
}
