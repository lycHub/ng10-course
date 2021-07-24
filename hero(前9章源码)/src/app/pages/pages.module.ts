import { NgModule } from '@angular/core';
import {HomeModule} from './home/home.module';
import { NoAuthComponent } from './no-auth/no-auth.component';
// import {LoginModule} from './login/login.module';



@NgModule({
  declarations: [NoAuthComponent],
  imports: [
    HomeModule
    // LoginModule
  ]
})
export class PagesModule { }
