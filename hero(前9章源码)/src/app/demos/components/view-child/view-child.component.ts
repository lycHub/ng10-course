import {AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {PanelComponent} from './panel/panel.component';

@Component({
  selector: 'app-view-child',
  templateUrl: './view-child.component.html',
  styles: [
  ]
})
export class ViewChildComponent implements OnInit, AfterViewInit {
  @ViewChild('box', { static: true }) private boxel: ElementRef;
  @ViewChildren('box') private boxels: QueryList<ElementRef>;
  // @ViewChild(PanelComponent, { static: true }) private panelInstance: PanelComponent;
  @ViewChild('panel', { static: true }) private panelInstance2: PanelComponent;
  @ViewChildren(PanelComponent) private panelInstances: QueryList<PanelComponent>;
  showChildOne = true;
  constructor() {
    // console.log('constructor', this.boxel);
  }

  ngOnInit(): void {
    // console.log('ngOnInit', this.boxel);
  }

  ngAfterViewInit(): void {
    // console.log('ngAfterViewInit', this.boxel.nativeElement);
    // alert(this.panelInstance.name);
    // console.log(this.panelInstance2.el.nativeElement);
    // console.log(this.boxels);
    // console.log(this.panelInstances.length);
    this.panelInstances.changes.subscribe(changes => {
      console.log('changes', changes);
    });
  }
}
