import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {Hero} from '../../../configs/types';
import HEROES from '../../../configs/hero';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-enter-leave',
  templateUrl: './enter-leave.component.html',
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('flyInOut', [
      state('in', style({ transform: 'translateX(0)' })),
      transition(':enter', [
        style({ transform: 'translateX(-100%)' }),
        animate(1000)
      ]),
      transition(':leave', [
        animate(1000, style({ transform: 'translateX(100%)' }))
      ])
    ])
  ]
})
export class EnterLeaveComponent implements OnInit {
  heroes: Hero[] = HEROES;
  constructor() { }

  ngOnInit(): void {
  }
  add() {
    this.heroes.push({
      id: 'hero_386159271133564732',
      name: '皇子',
      phone: 13356788776,
      gender: '0',
      genderText: '男',
      age: 30,
      job: '0',
      jobText: '战士',
      role: 'admin',
      email: '11245767788@lol.com',
      createTime: 1592711335647,
      brief: '德玛西亚之力'
    });
  }
  remove(id: string) {
    const index = this.heroes.findIndex(item => item.id === id);
    if (index > -1) {
      this.heroes.splice(index, 1);
    }
  }
}
