import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {DemosModule} from './demos/demos.module';
import {PagesModule} from './pages/pages.module';
import { NotFoundComponent } from './router-study/not-found/not-found.component';
import {HeroesModule} from './router-study/heroes/heroes.module';
import {CrisisCenterModule} from './router-study/crisis-center/crisis-center.module';
import { ComposeMessageComponent } from './router-study/compose-message/compose-message.component';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    ComposeMessageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HeroesModule,
    CrisisCenterModule,
    AppRoutingModule,
    DemosModule,
    PagesModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
