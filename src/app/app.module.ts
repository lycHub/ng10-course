import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {DemosModule} from './demos/demos.module';
import {PagesModule} from './pages/pages.module';
import { PageNotFoundComponent } from './router-study/page-not-found/page-not-found.component';
import {HeroesModule} from './router-study/heros/heroes.module';
import {CrisisCenterModule} from './router-study/crisis-center/crisis-center.module';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    DemosModule,
    PagesModule,
    HeroesModule,
    CrisisCenterModule,
    AppRoutingModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
