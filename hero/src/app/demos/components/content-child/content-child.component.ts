import {AfterViewInit, Component, ContentChild, ContentChildren, ElementRef, OnInit, QueryList, ViewChild} from '@angular/core';
import {ContentPanelComponent} from './panel/panel.component';

@Component({
  selector: 'app-content-child',
  templateUrl: './content-child.component.html',
  styles: [
  ]
})
export class ContentChildComponent implements OnInit, AfterViewInit {
  // @ContentChild('list', { static: true }) private listEl: ElementRef;
  @ContentChildren('list') private listEls: QueryList<ElementRef>;
  @ContentChild('span', { static: true }) private spanEl: ElementRef;
  // @ContentChild(ContentPanelComponent, { static: true }) private panelInstance: ContentPanelComponent;
  @ContentChildren(ContentPanelComponent, { descendants: true }) private panelInstances: QueryList<ContentPanelComponent>;
  constructor() { }

  ngOnInit(): void {
  }
  ngAfterViewInit(): void {
    // console.log(this.spanEl);
    // console.log(this.listEl);
    // console.log(this.panelInstance);
    // console.log(this.panelInstance.el.nativeElement.firstChild);
    // console.log(this.listEls);
    console.log(this.panelInstances);
  }

}
