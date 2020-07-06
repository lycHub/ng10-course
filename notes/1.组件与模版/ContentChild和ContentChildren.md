## ContentChild
**用法类似ViewChild, 获取投影中到组件或指令还有元素dom等**

### 获取投影中但组件
```typescript
import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-content-child-panel',
  templateUrl: './content-child-panel.component.html'
})
export class ContentChildPanelComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {}

  alert() {
    alert('aa');
  }
}

@Component({
  selector: 'app-content-child',
  template: `
      <div class="content-child-box">
        <h2>这是content child组件</h2>
        <div class="head" style="border: 1px solid; margin: 10px 0;">
          <ng-content select=".head"></ng-content>
        </div>
        <ng-content></ng-content>
      </div>
 `,
  styles: []
})
export class ContentChildComponent implements AfterViewInit {
  // 无法获取dom元素
  // @ContentChild('.head', { static: true }) private headEl: ElementRef;
  // @ContentChild('list', { static: true }) private listEl: ElementRef;
  @ContentChild(ContentChildPanelComponent, { static: true }) private panel: ContentChildPanelComponent;
  constructor() { }

  ngAfterViewInit(): void {
    this.panel.alert();
  }

}

```

调用ContentChildComponent：

```angular2html
<app-content-child>
  <div class="head">
    这是头部
  </div>
  <app-content-child-panel></app-content-child-panel>
  <ul #list>
    <li>aaa</li>
    <li>bbb</li>
  </ul>
</app-content-child>

```


## ContentChildren
**用法类似ViewChildren, 批量获取投影中到组件或指令**

```angular2html
<app-content-child>
  <div class="head">
    这是头部
  <app-content-child-panel></app-content-child-panel>
  </div>
  <app-content-child-panel></app-content-child-panel>
  <app-content-child-panel></app-content-child-panel>
  <ul #list>
    <li>aaa</li>
    <li>bbb</li>
  </ul>
</app-content-child>

```

```typescript
export class ContentChildComponent implements AfterViewInit {
  @ContentChildren(ContentChildPanelComponent) private panels: QueryList<ContentChildPanelComponent>;
  constructor() { }

  ngAfterViewInit(): void {
    console.log(this.panels); // 只有两个结果
  }

}

```

### descendants属性
> 这是ContentChildren特有但属性，上个例子少拿类一个panel组件，原因是默认只寻找直属子panel
而.head里但panel组件，并非直属，所以拿不到，想要寻找到所有层级的panel组件，就开启descendants


**@ContentChildren(ContentChildPanelComponent, { descendants: true }) private panels: QueryList<ContentChildPanelComponent>;**
