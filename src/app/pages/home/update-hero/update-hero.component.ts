import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-update-hero',
  templateUrl: './update-hero.component.html',
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UpdateHeroComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
