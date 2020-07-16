import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {DemosModule} from './demos/demos.module';
import {PagesModule} from './pages/pages.module';
import {HeroService} from './services/hero.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DemosModule,
    PagesModule
  ],
  providers: [
    // {provide: HeroService, useClass: HeroService}
    // HeroService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
