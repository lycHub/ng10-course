import {NgModule, Optional, SkipSelf} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import { HeaderComponent } from './layouts/header/header.component';
import {BreadcrumbModule} from './share/components/breadcrumb/breadcrumb.module';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {PagesModule} from './pages/pages.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { LoginComponent } from './layouts/login/login.component';
import {DirectivesModule} from './share/directives/directives.module';
import {CheckboxModule} from './share/components/checkbox/checkbox.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {InterceptorService} from './services/apis/interceptor.service';
import {MessageModule} from './share/components/message/message.module';
import { PlayerComponent } from './layouts/player/player.component';
import {BackTopModule} from './share/components/back-top/back-top.module';



@NgModule({
  declarations: [HeaderComponent, LoginComponent, PlayerComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    PagesModule,
    AppRoutingModule,
    BreadcrumbModule,
    DirectivesModule,
    CheckboxModule,
    FormsModule,
    ReactiveFormsModule,
    MessageModule,
    BackTopModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true },
  ],
  exports: [BackTopModule, HeaderComponent, BreadcrumbModule, BrowserModule, AppRoutingModule, LoginComponent, PlayerComponent]
})
export class CoreModule {
  constructor(@SkipSelf() @Optional() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule只能被AppModule引入');
    }
  }
}
