## [ViewChild](https://angular.cn/api/core/ViewChild)
**最好在ngAfterViewInit之后，获取模版上的内容**

### 获取普通dom
```typescript
import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-view-child',
  template: `
      <section>
        <h3>获取dom</h3>
        <div class="box" #box>
          <p>box</p>
        </div>
      </section>
 `,
  styles: []
})
export class ViewChildComponent implements OnInit, AfterViewInit {
  @ViewChild('box') private boxEl: ElementRef;
  constructor() {
    // TypeError: Cannot read property 'nativeElement' of undefined
    console.log('0', this.boxEl.nativeElement);
  }

  ngOnInit(): void {
    // TypeError: Cannot read property 'nativeElement' of undefined
    console.log('1', this.boxEl.nativeElement);
  }
  ngAfterViewInit(): void {
    console.log(2, this.boxEl.nativeElement); // 正确
  }
}

```

**上面例子中的boxEl，默认在变更检测之后才会获取到元素，而ngAfterViewInit就是在变更检测之后才会调研**

### static属性
> 默认在变更检测之后才会获取到目标元素，可开启static，这样组件初始化到时候，变更检测前就能获取到目标

```typescript
export class ViewChildComponent implements OnInit, AfterViewInit {
  @ViewChild('box', { static: true }) private boxEl: ElementRef;
  constructor() {
    // TypeError: Cannot read property 'nativeElement' of undefined
    console.log('0', this.boxEl.nativeElement);
  }

  ngOnInit(): void {
    console.log('1', this.boxEl.nativeElement); // 正确
  }
  ngAfterViewInit(): void {
    console.log(2, this.boxEl.nativeElement); // 正确
  }
}
```

**可以看到在constructor里是拿不到模板元素的，建议如果目标从一开始就显示在模版上**
<br>
**即没有被ngIf等指令操控，就开启static**



### 获取子组件（指令）
> 以组件为例，获取到组件实例后可以访问子组件到属性和方法，指令用法和组件一摸一样

```typescript
import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
@Component({
  selector: 'app-view-child-panel',
  templateUrl: './view-child-panel.component.html'
})
export class ViewChildPanelComponent implements OnInit {
  readonly name = 'panel';
  constructor() { }
  ngOnInit(): void {}
}


@Component({
  selector: 'app-view-child',
  template: `
      <section>
        <h3>获取自组件</h3>
        <app-view-child-panel></app-view-child-panel>
      </section>
 `,
  styles: []
})
export class ViewChildComponent implements OnInit, AfterViewInit {
  @ViewChild(ViewChildPanelComponent, { static: true }) private panel: ViewChildPanelComponent;
    constructor() {}
    ngOnInit(): void {}
    ngAfterViewInit(): void {
      // console.log(2, this.boxEl.nativeElement);
      console.log(this.panel.name);
    }
}

```


### 获取子组件（指令） 写法2
> 也可以通过模版引用变量获取子组件


```typescript
import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-view-child',
  template: `
      <section>
        <h3>获取自组件</h3>
        <app-view-child-panel #myPanel></app-view-child-panel>
      </section>
 `,
  styles: []
})
export class ViewChildComponent implements OnInit, AfterViewInit {
  @ViewChild('myPanel', { read: ViewChildPanelComponent, static: true }) private panel: ViewChildPanelComponent;
    constructor() {}
    ngOnInit(): void {}
    ngAfterViewInit(): void {
      // console.log(2, this.boxEl.nativeElement);
      console.log(this.panel.name);
    }
}
```

### 获取template
**上节课（TemplateRef和ViewContainerRef）已经演示过了**


## ViewChildren
> 与ViewChild类似，它可以批量获取模板上相同选择器的元素并存放到[QueryList](https://angular.cn/api/core/QueryList#querylist)类中
ViewChildren没有static属性

### 批量获取子组件和dom元素

```typescript
import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-view-child',
  template: `
      <section>
        <h3>获取dom</h3>
        <div class="box" #box>
          <p>box</p>
        </div>
      </section>
      
      
      <section #box>
        <h3>获取子组件</h3>
        <app-view-child-panel #myPanel></app-view-child-panel>
        <app-view-child-panel #myPanel></app-view-child-panel>
        <app-view-child-panel #myPanel></app-view-child-panel>
      </section>
 `,
  styles: []
})
export class ViewChildComponent implements OnInit, AfterViewInit {
  @ViewChild('box', { static: true }) private boxEl: ElementRef;
  @ViewChildren('box') private boxEls: QueryList<ElementRef>;
  @ViewChild(ViewChildPanelComponent, { static: true }) private panel: ViewChildPanelComponent;
  @ViewChildren(ViewChildPanelComponent) private panels: QueryList<ViewChildPanelComponent>;    constructor() {}
    ngOnInit(): void {}
    ngAfterViewInit(): void {
      console.log(this.panels);
      console.log(this.boxEls);
    }
}
```

### QueryList
> 模板元素集合，详细用法参考[文档](https://angular.cn/api/core/QueryList#querylist)

```typescript
import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-view-child',
  template: `
      
      <section>
        <h3>获取子组件</h3>
        <button class="btn btn-primary" (click)="showMidPanel = !showMidPanel">toggle mid</button>
        <app-view-child-panel #myPanel></app-view-child-panel>
        <app-view-child-panel #myPanel *ngIf="showMidPanel"></app-view-child-panel>
        <app-view-child-panel #myPanel></app-view-child-panel>
      </section>
 `,
  styles: []
})
export class ViewChildComponent implements OnInit, AfterViewInit {
  @ViewChildren(ViewChildPanelComponent) private panels: QueryList<ViewChildPanelComponent>;    constructor() {}
    ngOnInit(): void {}
    ngAfterViewInit(): void {
      this.panels.changes.subscribe(changes => {
        console.log('changes', changes);
      });
    }
}
```
