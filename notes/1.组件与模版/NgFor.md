## 基本使用
```typescript
import {Component} from '@angular/core';
const Heros = [
  {
    id: 'hero_0',
    name: '盖伦'
  },
  {
    id: 'hero_1',
    name: '赵信'
  },
  {
    id: 'hero_2',
    name: '嘉文'
  },
  {
    id: 'hero_3',
    name: '易大师'
  },
  {
    id: 'hero_3',
    name: '泰达米尔'
  }
];
interface Hero {
  id: string;
  name: string;
}

@Component({
  selector: 'app-switch',
  template: `
    <ul>
      <li *ngFor="let item of heros" [style.color]="item.id === 'hero_2' ? 'orange' : '#333'">{{ item.id }}</li>
    </ul>
  `,
})
export class SwitchComponent {
  heros: Hero[] = Heros;
}
```

## trackBy
> trackBy接收一个函数，返回 NgFor 应该跟踪的值（比如id），这样刷新列表时，id相同的dom不会触发更新

```typescript
import {Component} from '@angular/core';
@Component({
  selector: 'app-switch',
  template: `
    <p>
      add hero：
      <button class="btn btn-info" (click)="reset()">reset</button>
    </p>
    <ul>
      <li *ngFor="let item of heros; trackBy: trackByHero" [style.color]="item.id === 'hero_2' ? 'orange' : '#333'">{{ item.id }}</li>
    </ul>
  `,
})
export class SwitchComponent {
  heros: Hero[] = Heros;
  reset() {
    this.heros = [
      {
        id: 'hero_4',
        name: '盖伦4'
      },
      {
        id: 'hero_5',
        name: '赵信5'
      },
      {
        id: 'hero_2',
        name: '嘉文'
      },
      {
        id: 'hero_6',
        name: '易大师6'
      },
      {
        id: 'hero_7',
        name: '泰达米尔7'
      }
    ];
  }
  trackByHero(hero: Hero): string {
    return hero.id;
  }
}
```

## 局部变量
- $implicit: T：迭代目标（绑定到ngForOf）中每个条目的值。
- ngForOf: NgIterable<T>：迭代表达式的值。当表达式不局限于访问某个属性时，这会非常有用，比如在使用 async 管道时（userStreams | async）。
- index: number：可迭代对象中当前条目的索引。
- count: number：可迭代对象的长度。
- first: boolean：如果当前条目是可迭代对象中的第一个条目则为 true。
- last: boolean：如果当前条目是可迭代对象中的最后一个条目则为 true。
- even: boolean：如果当前条目在可迭代对象中的索引号为偶数则为 true。
- odd: boolean：如果当前条目在可迭代对象中的索引号为奇数则为 true。


```typescript
import {Component} from '@angular/core';
@Component({
  selector: 'app-switch',
  template: `
    <ul>
      <li
        *ngFor="let item of heros; index as i count as len; let ev = even; let od = odd; let f = first; let l = last trackBy: trackByHero"
      [class.even]="ev"
      [class.odd]="od">
        <p>first: {{ f }} -- last: {{ l }}</p>
        <p>name: {{ item.name }}</p>
        <p>length: {{ len }}</p>
        <p>index: {{ i }}</p>
        <hr />
      </li>
    </ul>
  `,
    styles: [`
    .even {
      color: #82fa54;
    }

    .odd {
      color: #698efa;
    }
  `]
})
export class SwitchComponent {
  heros: Hero[] = Heros;
  trackByHero(hero: Hero): string {
    return hero.id;
  }
}
```
