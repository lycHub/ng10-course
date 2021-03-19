## 基本使用
> ngIf是内置的结构型指令，控制宿主元素的添加或删除，取决于绑定的值是否为真

```typescript
import {Component} from '@angular/core';
@Component({
  selector: 'app-if',
  template: `
    <div *ngIf="condition">Content to render when condition is true.</div>
  `,
})
export class IfComp {
  condition = true;
}
```

## 扩展写法
>  *ngIf是个语法糖，上个例子完整的写法如下
```typescript
import {Component} from '@angular/core';
@Component({
  selector: 'app-if',
  template: `
    <ng-template [ngIf]="condition">
      <div>Content to render when condition is true.</div>
    </ng-template>
  `,
})
export class IfComp {
  condition = true;
}
```
**ng-template是一块内嵌模板，类型是[TemplateRef](https://angular.cn/api/core/TemplateRef)，下文和后面的课程会讲到**


## ngIfElese
```typescript
import {Component} from '@angular/core';
@Component({
  selector: 'app-if',
  template: `
    <button class="btn btn-primary" (click)="condition = !condition">toggle show</button>
    <div *ngIf="condition; else elseBlock">condition为真时显示</div>
    <ng-template #elseBlock>
      <p>condition为假时显示</p>
    </ng-template>
  `,
})
export class IfComp {
  condition = true;
}
```

## ngIfElese（拓展写法）
```typescript
import {Component} from '@angular/core';
@Component({
  selector: 'app-if',
  template: `
    <button class="btn btn-primary" (click)="condition = !condition">toggle show</button>
    <div *ngIf="condition; else elseBlock">condition为真时显示</div>
    <ng-template #elseBlock>
      <p>condition为假时显示</p>
    </ng-template>
  `,
})
export class IfComp {
  condition = true;
}
```


**上面例子中的elseBlock并非组件中的某变量，而是TemplateRef的引用**

## ngIfThen
```typescript
import {Component} from '@angular/core';
@Component({
  selector: 'app-if',
  template: `
    <div *ngIf="condition; then thenBlock else elseBlock"></div>
    <ng-template #thenBlock>condition为true时显示</ng-template>
    <ng-template #elseBlock>condition为false时显示</ng-template>
  `,
})
export class IfComp {
  condition = true;
}
```
**上面这种写法和ngIfElese实例一样，所以没必要这么写**


## 使用TemplateRef
> 上面示例中的else 或 then 后面跟的变量都是模板的引用而非组件中的变量，下面演示怎么用组件中的变量

```typescript
import {Component, OnInit, ChangeDetectionStrategy, ViewChild, TemplateRef, AfterViewInit} from '@angular/core';
@Component({
  selector: 'app-if',
  template: `
    <button class="btn btn-primary" (click)="condition = !condition">toggle block</button>
    <p *ngIf="condition else elseBlocks">{{ condition }} === true 时显示</p>
    <ng-template #firstTpl>
      <p>{{ condition }} === false 时显示</p>
    </ng-template>
  `,
})
export class IfComponent implements OnInit, AfterViewInit {
  elseBlocks: TemplateRef<any> = null;
  @ViewChild('firstTpl', {static: true}) primaryBlock: TemplateRef<any> = null;
  condition = false;
  constructor() {

  }
  ngOnInit(): void {
    console.log('ngOnInit', this.primaryBlock);
    this.elseBlocks = this.primaryBlock;
  }
}
```
