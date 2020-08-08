import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CrisisCenterRoutingModule } from './crisis-center-routing.module';
import {CrisisListComponent} from './crisis-list/crisis-list.component';


@NgModule({
  declarations: [
    CrisisListComponent
  ],
  imports: [
    CommonModule,
    CrisisCenterRoutingModule
  ]
})
export class CrisisCenterModule { }
