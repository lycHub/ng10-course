import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {Observable} from 'rxjs';
import {Hero} from '../../heroes/hero';
import {CrisisService} from '../crisis.service';

@Component({
  selector: 'app-crisis-list',
  templateUrl: './crisis-list.component.html',
  styles: [
    `
          .list-group {
              width: 320px;
              cursor: pointer;
          }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CrisisListComponent implements OnInit {
  crises$: Observable<Hero[]>;
  selectedId: number;
  constructor(private crisisServe: CrisisService) { }

  ngOnInit(): void {
    this.crises$ = this.crisisServe.getCrises();
  }

  onSelect(id: number) {
    this.selectedId = id;
  }
}
