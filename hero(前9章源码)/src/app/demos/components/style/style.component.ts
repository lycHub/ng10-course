import {AfterViewInit, Component, ElementRef, OnInit} from '@angular/core';

@Component({
  selector: 'app-style',
  templateUrl: './style.component.html',
  styles: [
    `
         /* :host {
              border: 5px solid #b8414d;
          }*/

         :host(.active) {
             border-right: 5px solid #b8414d;
         }

         :host-context(.theme-light) .title {
             background-color: #95f04c;
         }

          .style p {
              height: 30px;
              line-height: 30px;
              color: #fff;
          }
      .test-mode {
          color: #fff;
      }
    `
  ]
})
export class StyleComponent implements OnInit, AfterViewInit {

  constructor(private el: ElementRef) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    console.log(this.el.nativeElement);
  }
}
