```typescript
import { Component, Input, TemplateRef } from '@angular/core';
@Component({
  selector: 'app-tpl-outlet',
  template: `<div>
               <ng-container *ngTemplateOutlet="render || defaultTpl; context: myContext"></ng-container>
               <!--      <ng-container [ngTemplateOutlet]="render || defaultTpl" [ngTemplateOutletContext]="myContext"></ng-container>-->
               
               <!--   用在ng-template上也可以   -->
               <!--      <ng-template *ngTemplateOutlet="render || defaultTpl; context: myContext"></ng-template>-->
               <!--      <ng-template [ngTemplateOutlet]="render || defaultTpl" [ngTemplateOutletContext]="myContext"></ng-template>-->
             </div>`
})
export class TplOutletComponent  {
  @Input () render: TemplateRef<any>;
  myContext = {$implicit: 'World', value: 'Svet'};
}
```

调用TplOutletComponent传入自定义的dom
```typescript
import { Component, Input } from '@angular/core';
@Component({
  selector: 'app-root',
  template: `<app-tpl-outlet [render]="render"></app-tpl-outlet>
             <ng-template #render let-value="value">
               <p><b>自定义的dom -- {{ value }}</b></p>
             </ng-template>
          `
})
export class ItemDetailComponent  {

}
```
