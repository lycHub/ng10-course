import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {Hero} from '../../../configs/types';
import HEROES from '../../../configs/hero';
import {animate, group, sequence, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-enter-leave-group',
  templateUrl: './enter-leave-group.component.html',
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('flyInOut', [
      state('in', style({
        width: 120,
        transform: 'translateX(0)',
        opacity: 1
      })),
      transition('void => *', [
        style({ width: 10, transform: 'translateX(50px)', opacity: 0 }),
        //  改成sequence就会是顺序执行
        group([
          animate('1s ease', style({
            transform: 'translateX(0)',
            width: 120,
            backgroundColor: 'red'
          })),
          animate('1s ease', style({
            opacity: 1,
            height: 100
          }))
        ])
      ]),
      transition('* => void', [
        group([
          animate('0.3s ease', style({
            transform: 'translateX(50px)',
            width: 10
          })),
          animate('0.3s ease', style({
            opacity: 0
          }))
        ])
      ])
    ])
  ]
})
export class EnterLeaveGroupComponent implements OnInit {
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
