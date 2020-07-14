import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LayoutComponent} from './layout/layout.component';
import {HerosComponent} from './heros/heros.component';
import {FormsModule} from '@angular/forms';



@NgModule({
  declarations: [
    LayoutComponent,
    HerosComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    LayoutComponent,
    HerosComponent
  ]
})
export class PagesModule { }
