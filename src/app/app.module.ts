import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {DialogComponent} from './components/dialog/dialog.component';
import { SizerComponent } from './components/sizer/sizer.component';
import {FormsModule} from '@angular/forms';
import { IfComponent } from './components/if/if.component';

@NgModule({
  declarations: [
    AppComponent,
    DialogComponent,
    SizerComponent,
    IfComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
