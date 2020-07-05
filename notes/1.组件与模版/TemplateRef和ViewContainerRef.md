```typescript
import {AfterViewInit, Component, EmbeddedViewRef, OnInit, TemplateRef, ViewChild, ViewContainerRef} from '@angular/core';

@Component({
  selector: 'app-show-data',
  templateUrl: './show-data.component.html'
})
export class ShowDataComponent implements AfterViewInit {
  @ViewChild('firstTpl', { read: TemplateRef }) readonly firstTpl: TemplateRef<any>;
  @ViewChild('secondTpl', { read: TemplateRef }) readonly secondTpl: TemplateRef<any>;
  @ViewChild('thirdTpl', { read: TemplateRef }) readonly thirdTpl: TemplateRef<any>;
  @ViewChild('fourthTpl', { read: TemplateRef }) readonly fourTpl: TemplateRef<any>;
  @ViewChild('freeTpl', { read: TemplateRef }) readonly freeTpl: TemplateRef<any>;
  @ViewChild('firstContainer', { read: ViewContainerRef, static: true }) readonly container: ViewContainerRef;
  visible = false;
  context = { $implicit: 'World', name: 'dema' };
  private freeViewRef: EmbeddedViewRef<any>;
  ngAfterViewInit(): void {
    // console.log('firstTpl', this.firstTpl);
    this.freeViewRef = this.freeTpl.createEmbeddedView(null);
    setTimeout(() => {
      this.container.createEmbeddedView(this.firstTpl);
    }, 0);
  }

  insert(target: TemplateRef<any>) {
    this.container.insert(target.createEmbeddedView(this.context));
  }

  insertFree() {
    this.container.insert(this.freeViewRef);
  }

  move() {
    // 不需要事先插入也可以移动
    this.container.move(this.freeViewRef, 2);
  }

  move2To4() {
    // 不需要事先插入也可以移动
    const view = this.container.detach(1);
    this.container.insert(view, 3);
  }

  insertAll() {
    [this.secondTpl, this.thirdTpl, this.fourTpl].forEach(tpl => {
      this.container.insert(tpl.createEmbeddedView(this.context));
    });
  }

  getOne() {
    console.log(this.container.get(2));
    console.log(this.container.indexOf(this.freeViewRef));
  }
}

```

```angular2html
<p>show data works</p>
<button class="btn btn-primary mr-1" (click)="insert(secondTpl)">insert second</button>
<button class="btn btn-primary mr-1" (click)="insert(thirdTpl)">insert third</button>
<button class="btn btn-primary mr-1" (click)="insertAll()">insert all</button>
<button class="btn btn-danger mr-1" (click)="container.clear()">clear</button>

<button class="btn btn-info mr-1" (click)="getOne()">get one</button>

<button class="btn btn-primary mr-1" (click)="insertFree()">insert free</button>
<button class="btn btn-primary mr-1" (click)="move()">move free</button>
<button class="btn btn-primary" (click)="move2To4()">把第二个移动到第四个位置上</button>

<p>count: {{ container.length }}</p>

<ng-template #firstTpl>
  <p>一段template</p>
</ng-template>

<ng-template #secondTpl let-default let-name="name">
  <p>第二段template -- {{ name }} -- {{ default }}</p>
</ng-template>

<ng-template #thirdTpl>
  <p>第三段template</p>
</ng-template>

<ng-template #fourthTpl>
  <p>第四段template</p>
</ng-template>

<ng-template #freeTpl>
  <p>自由的template</p>
</ng-template>


<ng-container #firstContainer>
  <p> 一段container </p>
</ng-container>

```
