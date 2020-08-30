import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UserCenterComponent} from './user-center.component';
import {UserAuthGuard} from '../../../services/guards/user-auth.guard';


const routes: Routes = [
  {
    path: '',
    component: UserCenterComponent,
    canActivate: [UserAuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserCenterRoutingModule { }
