import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {DemosModule} from './demos/demos.module';
import {PagesModule} from './pages/pages.module';
import { NotFoundComponent } from './router-study/not-found/not-found.component';
import {HeroesModule} from './router-study/heroes/heroes.module';
import { ComposeMessageComponent } from './router-study/compose-message/compose-message.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NameEditorComponent } from './form-study/name-editor/name-editor.component';
import { ProfileEditorComponent } from './form-study/profile-editor/profile-editor.component';
import { ForbiddenValidatorDirective } from './form-study/forbidden-validator.directive';
import { EqualValidatorDirective } from './form-study/equal-validator.directive';
import { HasMobileValidatorDirective } from './form-study/has-mobile-validator.directive';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    ComposeMessageComponent,
    NameEditorComponent,
    ProfileEditorComponent,
    ForbiddenValidatorDirective,
    EqualValidatorDirective,
    HasMobileValidatorDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HeroesModule,
    DemosModule,
    PagesModule,
    AppRoutingModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
