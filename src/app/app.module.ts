import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {DemosModule} from './demos/demos.module';
import {PagesModule} from './pages/pages.module';
import {CrisisListComponent} from './router-study/crisis-list/crisis-list.component';
import {HeroListComponent} from './router-study/hero-list/hero-list.component';
import { PageNotFoundComponent } from './router-study/page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    HeroListComponent,
    CrisisListComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DemosModule,
    PagesModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
