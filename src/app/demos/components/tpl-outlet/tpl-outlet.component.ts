import {Component, Input, OnInit, TemplateRef} from '@angular/core';

@Component({
  selector: 'app-tpl-outlet',
  templateUrl: './tpl-outlet.component.html'
})
export class TplOutletComponent implements OnInit {
  @Input() render: TemplateRef<any>;
  myContext = {$implicit: 'World', value: 'Svet'};
  constructor() { }

  ngOnInit(): void {
  }

}
