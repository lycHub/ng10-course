### 定义数据类型

types.ts
```typescript
export interface HeroArg {
  name: string;
  job: string;
  sort: 'desc' | 'asc';
}

export interface Hero {
  id: string;
  name: string;
  phone: number;
  createTime: number;
  gender: string;
  genderText: string;
  job: string;
  jobText: string;
  role: string;
  age?: number;
  email?: string;
  brief?: string;
}
```

### layout组件
layout.component.html
```angular2html
<div class="home">
  <div class="container-fluid">
    <header class="header alert alert-primary">
      <div class="row justify-content-end align-items-center">
        <div class="col-4">
          <h2 class="title text-center" routerLink="/home">Hero Management Office</h2>
        </div>
        <div class="col-4">
          <a class="login">登录</a>
        </div>
      </div>
    </header>
  </div>
  <div class="container">
    <nav aria-label="breadcrumb">
      <ul class="breadcrumb">
        <li class="breadcrumb-item">首页</li>
        <li class="breadcrumb-item">英雄列表</li>
      </ul>
    </nav>
    <div class="content">
      <app-heros></app-heros>
    </div>
  </div>
</div>
```

layout.component.scss
```scss
.home {
  .header {
    .title {
      cursor: pointer;
      outline: none;
    }
    .login, .dropdown {
      cursor: pointer;
    }
  }
  .content {}
}

```

layout.component.ts
```typescript
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutComponent implements OnInit {
  constructor() { }
  ngOnInit(): void {}
}

```



### heros组件
heros.component.html
```angular2html
<div class="heros">
  <div class="card">
    <div class="card-body">
      <form>
        <div class="form-row">
          <div class="col">
            <input type="text" [(ngModel)]="searchParams.name" name="name" class="form-control" placeholder="姓名" />
          </div>
          <div class="col">
            <select
              [(ngModel)]="searchParams.job"
              class="form-control"
              name="job">
              <option value="">职业</option>
              <option value="0">法师</option>
              <option value="1">战士</option>
              <option value="2">刺客</option>
              <option value="3">射手</option>
              <option value="4">坦克</option>
            </select>
          </div>
          <div class="col">
            <select name="sort" class="form-control" [(ngModel)]="searchParams.sort">
              <option value="desc">降序</option>
              <option value="asc">升序</option>
            </select>
          </div>
          <div class="col">
            <button class="btn btn-primary">搜索</button>
          </div>
        </div>
      </form>
    </div>
  </div>
  <button type="button" class="btn btn-primary btn-add" >新增</button>
  <div class="card">
    <div class="card-body">
      <table class="table table-striped table-hover text-center" *ngIf="heros.length else empty">
        <thead>
        <tr>
          <th scope="col">姓名</th>
          <th scope="col">性别</th>
          <th scope="col">年龄</th>
          <th scope="col">职业</th>
          <th scope="col">邮箱</th>
          <th scope="col">创建时间</th>
          <th scope="col">简介</th>
          <th scope="col">操作</th>
        </tr>
        </thead>
        <tbody>
        <tr *ngFor="let item of heros">
          <th scope="row">{{ item.name }}</th>
          <th>{{ item.genderText }}</th>
          <th>{{ item.age }}</th>
          <td>{{ item.jobText }}</td>
          <td>{{ item.email }}</td>
          <td>{{ item.createTime }}</td>
          <td>{{ item.brief }}</td>
          <td class="actions">
            <button type="button" class="btn btn-primary btn-modify">修改</button>
            <button type="button" class="btn btn-danger">删除</button>
          </td>
        </tr>
        </tbody>
      </table>
      <ng-template #empty>
        <p class="text-center">empty</p>
      </ng-template>
    </div>
  </div>
</div>

```

heros.component.scss
```scss
.heros {
  .btn-add {
    margin: 16px 0;
  }
  .card {

  }
  .actions {
    .btn-modify {
      margin-right: 8px;
    }
  }
}
```

heros.component.ts
```typescript
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
@Component({
  selector: 'app-heros',
  templateUrl: './heros.component.html',
  styleUrls: ['./heros.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HerosComponent implements OnInit {
  searchParams: HeroArg = {
    name: '',
    job: '',
    sort: 'desc'
  };
  showSpin = false;
  heros: Hero[] = [
    {
      id: 'hero_3861592711335647',
      name: '盖伦',
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
    },
    {
      id: 'hero_3081592487543496',
      name: '赵信',
      phone: 15356708566,
      gender: '0',
      genderText: '男',
      age: 30,
      job: '0',
      jobText: '战士',
      role: 'user',
      email: '11245767788@lol.com',
      createTime: 1592487543496,
      brief: '菊花总管'
    }
  ]
  constructor() { }

  ngOnInit(): void {}

}
```
