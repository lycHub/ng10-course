import {Component, OnInit, ChangeDetectionStrategy, Input, TemplateRef, Optional} from '@angular/core';
import {BreadcrumbComponent} from '../breadcrumb.component';

@Component({
  selector: 'xm-breadcrumb-item',
  templateUrl: './breadcrumb-item.component.html',
  styleUrls: ['./breadcrumb-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BreadcrumbItemComponent implements OnInit {
  constructor(@Optional() readonly parent: BreadcrumbComponent) { }

  ngOnInit(): void {
  }

}
