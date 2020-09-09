```typescript
import {AfterViewInit, Component, EmbeddedViewRef, OnInit, TemplateRef, ViewChild, ViewContainerRef} from '@angular/core';

@Component({
  selector: 'app-tpl-container',
  templateUrl: './tpl-container.component.html'
})
export class TplContainerComponent implements OnInit, AfterViewInit {
  // 获取模板中的元素(组件、ng-template、dom)
  @ViewChild('box') readonly boxEl: ElementRef;
  @ViewChild('firstTpl', { read: TemplateRef }) readonly firstTpl: TemplateRef<any>;
  @ViewChild('secondTpl', { read: TemplateRef }) readonly secondTpl: TemplateRef<any>;
  @ViewChild('thirdTpl', { read: TemplateRef }) readonly thirdTpl: TemplateRef<any>;
  @ViewChild('fourthTpl', { read: TemplateRef }) readonly fourTpl: TemplateRef<any>;
  @ViewChild('freeTpl', { read: TemplateRef }) readonly freeTpl: TemplateRef<any>;
  @ViewChild('firstContainer', { read: ViewContainerRef, static: true }) readonly firstContain: ViewContainerRef;
  @ViewChild('secondContainer', { read: ViewContainerRef, static: true }) readonly secondContain: ViewContainerRef;
  private freeViewRef: EmbeddedViewRef<any>;
  constructor() {
    // console.log('constructor');
  }

  insert(tpl: TemplateRef<any>) {
    this.firstContain.insert(tpl.createEmbeddedView(null));
  }

  insertAll() {
    [this.secondTpl, this.thirdTpl, this.fourTpl].forEach(tpl => {
      this.firstContain.insert(tpl.createEmbeddedView(null));
    });
  }

  getOne() {
    console.log(this.firstContain.get(2));
    console.log(this.firstContain.indexOf(this.freeViewRef));
  }

  insertFree() {
    this.firstContain.insert(this.freeViewRef, 1);
  }

  move() {
    // 不需要事先插入也可以移动(定好位置再插入)
    this.firstContain.move(this.freeViewRef, 2);
  }

  move2To4() {
    const view = this.firstContain.detach(1);
    this.firstContain.insert(view, 3);
  }

  move2ToOther() {
    const view = this.firstContain.detach(1);
    this.secondContain.insert(view);
  }

  ngOnInit(): void {
    // console.log('onInit');
  }

  ngAfterViewInit(): void {
    console.log('ngAfterViewInit');
    this.freeViewRef = this.freeTpl.createEmbeddedView({ $implicit: 'defaultValue', free: 'aa' });
    // console.log(this.firstTpl);
    // const viewRef = this.firstTpl.createEmbeddedView(null);
    // console.log('viewRef', viewRef);
    /*this.boxEl.nativeElement.appendChild(viewRef.rootNodes[0]);*/
    setTimeout(() => {
      this.firstContain.createEmbeddedView(this.firstTpl);
    }, 0);
  }

}

```

```angular2html
<div class="box" #box>
  <button class="btn btn-primary mr-1" (click)="insert(secondTpl)">insert second</button>
  <button class="btn btn-primary mr-1" (click)="insert(thirdTpl)">insert third</button>
  <button class="btn btn-primary mr-1" (click)="insert(fourthTpl)">insert fourth</button>
  <button class="btn btn-primary mr-1" (click)="insertAll()">insert all</button>
  <button class="btn btn-secondary mr-1" (click)="insertFree()">insert free</button>
  <button class="btn btn-info mr-1" (click)="getOne()">get one</button>
  <button class="btn btn-success mr-1" (click)="move()">move free</button>
  <button class="btn btn-success mr-1" (click)="move2To4()">把第二个移动到第四个位置上</button>
  <button class="btn btn-success" (click)="move2ToOther()">把第二个移动到其他容器中</button>
  <p>长度：{{ firstContain?.length }}</p>
</div>
<ng-template #firstTpl>
  <p>first tpl content</p>
</ng-template>


<ng-template #secondTpl>
  <p>第二段template</p>
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

<p>
  first container:
  <ng-container #firstContainer></ng-container>
</p>

<hr>

<p>
  second container:
  <ng-container #secondContainer></ng-container>
</p>

```
