import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import {FormsModule} from '@angular/forms';
import { ForbiddenCnDirective } from './forbin-cn.directive';
import {OpenCloseComponent} from './open-close/open-close.component';
import { EnterLeaveComponent } from './enter-leave/enter-leave.component';
import { InsertRemoveComponent } from './insert-remove/insert-remove.component';
import { OpenCloseTwoComponent } from './open-close-two/open-close-two.component';
import { StatusSliderComponent } from './status-slider/status-slider.component';
import { EnterLeaveGroupComponent } from './enter-leave-group/enter-leave-group.component';
import { QueryStaggerComponent } from './query-stagger/query-stagger.component';


@NgModule({
  declarations: [LoginComponent, ForbiddenCnDirective, OpenCloseComponent, EnterLeaveComponent, InsertRemoveComponent, OpenCloseTwoComponent, StatusSliderComponent, EnterLeaveGroupComponent, QueryStaggerComponent],
  imports: [
    CommonModule,
    FormsModule,
    LoginRoutingModule,
    // ServiceModule
  ]
})
export class LoginModule { }
