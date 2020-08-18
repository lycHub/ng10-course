import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {DemosModule} from './demos/demos.module';
import {PagesModule} from './pages/pages.module';
import { NotFoundComponent } from './router-study/not-found/not-found.component';
import {HeroesModule} from './router-study/heroes/heroes.module';
import { ComposeMessageComponent } from './router-study/compose-message/compose-message.component';
import {FormsModule} from '@angular/forms';
import {AuthModule} from './router-study/auth/auth.module';

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
    AuthModule,
    DemosModule,
    PagesModule,
    AppRoutingModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
