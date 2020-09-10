import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbComponent } from './breadcrumb.component';
import { BreadcrumbItemComponent } from './breadcrumb-item/breadcrumb-item.component';



@NgModule({
  declarations: [BreadcrumbComponent, BreadcrumbItemComponent],
  imports: [
    CommonModule
  ],
  exports: [BreadcrumbComponent, BreadcrumbItemComponent]
})
export class BreadcrumbModule { }
