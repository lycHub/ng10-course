import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login.component';
import {LoginAuthGuard} from '../../services/guards/login-auth.guard';


const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    canActivate: [LoginAuthGuard],
    data: { title: '登陆' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
