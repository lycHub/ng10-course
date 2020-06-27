import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NullCompComponent } from './null-comp/null-comp.component';
import { MyCompComponent } from './components/my-comp/my-comp.component';
import { InlineCompComponent } from './components/inline-comp/inline-comp.component';
import { NoTestCompComponent } from './components/no-test-comp/no-test-comp.component';
import { CustomSelectorCompComponent } from './components/custom-selector-comp/custom-selector-comp.component';

@NgModule({
  declarations: [
    AppComponent,
    NullCompComponent,
    MyCompComponent,
    InlineCompComponent,
    NoTestCompComponent,
    CustomSelectorCompComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
