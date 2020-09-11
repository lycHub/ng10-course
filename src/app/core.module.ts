import {NgModule, Optional, SkipSelf} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import { HeaderComponent } from './layouts/header/header.component';
import {BreadcrumbModule} from './share/components/breadcrumb/breadcrumb.module';
import {HttpClientModule} from '@angular/common/http';



@NgModule({
  declarations: [HeaderComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BreadcrumbModule
  ],
  exports: [HeaderComponent, BreadcrumbModule, BrowserModule]
})
export class CoreModule {
  constructor(@SkipSelf() @Optional() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule只能被AppModule引入');
    }
  }
}
