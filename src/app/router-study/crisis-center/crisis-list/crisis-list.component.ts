import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {Crisis} from '../crisis';
import {CrisisService} from '../crisis.service';
import {MessageService} from '../../message.service';

@Component({
  selector: 'app-crisis-list',
  template: `<h2>crises</h2>
  <ul class="crises">
    <li *ngFor="let crisis of crises" [class.selected]="crisis === selectedcrisis" (click)="onSelect(crisis)">
      <span class="badge">{{crisis.id}}</span> {{crisis.name}}
    </li>
  </ul>
  <router-outlet></router-outlet>`,
  styles: [`
    .crises {
      margin: 0 0 2em 0;
      list-style-type: none;
      padding: 0;
      width: 22em;
    }
    .crises li {
      cursor: pointer;
      position: relative;
      left: 0;
      background-color: #EEE;
      margin: .5em;
      padding: .3em 0;
      height: 2.6em;
      border-radius: 4px;
    }
    .crises li:hover {
      color: #607D8B;
      background-color: #DDD;
      left: .1em;
    }
    .crises li.selected {
      background-color: #CFD8DC;
      color: white;
    }
    .crises li.selected:hover {
      background-color: #BBD8DC;
      color: white;
    }
    .crises .badge {
      display: inline-block;
      font-size: small;
      color: white;
      padding: 0.8em 0.7em 0 0.7em;
      background-color:#405061;
      line-height: 1em;
      position: relative;
      left: -1px;
      top: -4px;
      height: 100%;
      margin-right: .8em;
      border-radius: 4px 0 0 4px;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CrisisListComponent implements OnInit {
  selectedcrisis: Crisis;

  crises: Crisis[];

  constructor(private crisisService: CrisisService, private messageService: MessageService) { }

  ngOnInit() {
    this.getcrises();
  }

  onSelect(crisis: Crisis): void {
    this.selectedcrisis = crisis;
    this.messageService.add(`crisesComponent: Selected crisis id=${crisis.id}`);
  }

  getcrises(): void {
    this.crisisService.getCrises().subscribe(crises => this.crises = crises);
  }

}
