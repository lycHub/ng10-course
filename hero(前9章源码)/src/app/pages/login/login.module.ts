import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import {FormsModule} from '@angular/forms';
import { ForbiddenCnDirective } from './forbin-cn.directive';
import {OpenCloseComponent} from './open-close/open-close.component';
import { FlyInOutComponent } from './fly-in-out/fly-in-out.component';
import { InsertRemoveComponent } from './insert-remove/insert-remove.component';
import { StatusSliderComponent } from './status-slider/status-slider.component';
import { FlyInOutGroupComponent } from './fly-in-out-group/fly-in-out-group.component';
import { QueryStaggerComponent } from './query-stagger/query-stagger.component';


@NgModule({
  declarations: [LoginComponent, ForbiddenCnDirective, OpenCloseComponent, FlyInOutComponent, InsertRemoveComponent, StatusSliderComponent, FlyInOutGroupComponent, QueryStaggerComponent],
  imports: [
    CommonModule,
    FormsModule,
    LoginRoutingModule,
    // ServiceModule
  ]
})
export class LoginModule { }
