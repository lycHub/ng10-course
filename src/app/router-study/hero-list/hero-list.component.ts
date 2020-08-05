import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-hero-list',
  template: `
    <h2>HEROES</h2>
    <p>Get your heroes here</p>
    <button routerLink="/sidekicks" class="btn btn-primary">Go to sidekicks</button>
  `,
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeroListComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
