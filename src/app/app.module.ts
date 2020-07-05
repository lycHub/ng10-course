import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {DialogComponent} from './demos/components/dialog/dialog.component';
import { SizerComponent } from './demos/components/sizer/sizer.component';
import {FormsModule} from '@angular/forms';
import { IfComponent } from './demos/components/if/if.component';
import { SwitchComponent } from './demos/components/switch/switch.component';
import { ForComponent } from './demos/components/for/for.component';
import { TplVarComponent } from './demos/components/tpl-var/tpl-var.component';
import { TplOperatorsComponent } from './demos/components/tpl-operators/tpl-operators.component';
import { TransferPanelComponent } from './demos/components/transfer-panel/transfer-panel.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { HerosComponent } from './pages/heros/heros.component';
import { HighlightDirective } from './demos/directives/highlight.directive';
import { ExampleComponent } from './demos/example/example.component';
import { StructuralComponent } from './demos/components/structural/structural.component';
import { UnlessDirective } from './demos/directives/unless.directive';

@NgModule({
  declarations: [
    AppComponent,
    DialogComponent,
    SizerComponent,
    IfComponent,
    SwitchComponent,
    ForComponent,
    TplVarComponent,
    TplOperatorsComponent,
    TransferPanelComponent,
    LayoutComponent,
    HerosComponent,
    HighlightDirective,
    ExampleComponent,
    StructuralComponent,
    UnlessDirective
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
