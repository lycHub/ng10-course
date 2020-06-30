import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';

@Component({
  selector: 'app-if',
  templateUrl: './if.component.html'
})
export class IfComponent implements OnInit {
  showBlock = true;
  showBlock2 = true;
  condition = true;
  elseBlock: TemplateRef<any>;
  @ViewChild('firstBlock', { static: true }) private firstBlock: TemplateRef<any>;
  constructor() { }

  ngOnInit(): void {
    this.elseBlock = this.firstBlock;
  }

}
