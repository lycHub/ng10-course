import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import {FormsModule} from '@angular/forms';
import { ForbiddenCnDirective } from './forbin-cn.directive';
// import {ServiceModule} from '../../services/service.module';


@NgModule({
  declarations: [LoginComponent, ForbiddenCnDirective],
  imports: [
    CommonModule,
    FormsModule,
    LoginRoutingModule,
    // ServiceModule
  ]
})
export class LoginModule { }
