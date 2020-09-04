import {Component, OnInit, ChangeDetectionStrategy, HostBinding} from '@angular/core';
import {animate, group, query, stagger, state, style, transition, trigger} from '@angular/animations';
export interface Hero {
  id: number;
  name: string;
}

const HEROES: Hero[] = [
  { id: 11, name: 'Dr Nice' },
  { id: 12, name: 'Narco' },
  { id: 13, name: 'Bombasto' },
  { id: 14, name: 'Celeritas' },
  { id: 15, name: 'Magneta' },
  { id: 16, name: 'RubberMan' },
  { id: 17, name: 'Dynama' },
  { id: 18, name: 'Dr IQ' },
  { id: 19, name: 'Magma' },
  { id: 20, name: 'Tornado' }
];


@Component({
  selector: 'app-query-stagger',
  templateUrl: './query-stagger.component.html',
  styleUrls: ['./query-stagger.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('pageAnimations', [
      transition(':enter', [
        query('.heroes, form', [
          style({opacity: 0, transform: 'translateY(-100px)'}),
          stagger(300, [
            animate('500ms cubic-bezier(0.35, 0, 0.25, 1)', style({ opacity: 1, transform: 'none' }))
          ])
        ])
      ])
    ]),
    trigger('filterAnimation', [
      transition(':enter, * => 0, * => -1', []),
      transition(':increment', [
        query(':enter', [
          style({ opacity: 0, width: '0px' }),
          stagger(50, [
            animate('300ms ease-out', style({ opacity: 1, width: '*' })),
          ]),
        ], { optional: true })
      ]),
      transition(':decrement', [
        query(':leave', [
          stagger(50, [
            animate('300ms ease-out', style({ opacity: 0, width: '0px' })),
          ]),
        ], { optional: true })
      ]),
    ])
  ]
})
export class QueryStaggerComponent implements OnInit {
  heroes: Hero[] = HEROES;
  heroTotal = HEROES.length;
  constructor() { }
  @HostBinding('@pageAnimations')
  public animatePage = true;
  ngOnInit(): void {
  }

  updateHeroes(value: string) {
    this.heroes = HEROES.filter(hero => hero.name.toLowerCase().includes(value.toLowerCase()));
    this.heroTotal = this.heroes.length;
  }
}
