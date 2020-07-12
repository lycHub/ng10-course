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
import { TransferPanelComponent } from './demos/components/transfer/transfer-panel/transfer-panel.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { HerosComponent } from './pages/heros/heros.component';
import { HighlightDirective } from './demos/directives/highlight.directive';
import { ExampleComponent } from './demos/example/example.component';
import { StructuralComponent } from './demos/components/structural/structural.component';
import { UnlessDirective } from './demos/directives/unless.directive';
import { TplContainerComponent } from './demos/components/tpl-container/tpl-container.component';
import { TplOutletComponent } from './demos/components/tpl-outlet/tpl-outlet.component';
import { ShadowComponent } from './demos/components/shadow/shadow.component';
import { ViewChildComponent } from './demos/components/view-child/view-child.component';
import { PanelComponent } from './demos/components/view-child/panel/panel.component';
import { ContentChildComponent } from './demos/components/content-child/content-child.component';
import {ContentPanelComponent} from './demos/components/content-child/panel/panel.component';
import { PipeComponent } from './demos/components/pipe/pipe.component';
import { ExponentialStrengthPipe } from './demos/pipes/exponential-strength.pipe';
import { FlyingHeroesImpurePipe } from './demos/pipes/flying-heroes-impure.pipe';
import { LifeCycleComponent } from './demos/components/life-cycle/life-cycle.component';
import { ChangeComponent } from './demos/components/change-detection/change/change.component';
import { ChangeChildComponent } from './demos/components/change-detection/change-child/change-child.component';
import { ChangeGrandsonComponent } from './demos/components/change-detection/change-grandson/change-grandson.component';
import { StyleComponent } from './demos/components/style/style.component';
import { TransferComponent } from './demos/components/transfer/transfer.component';
import { AlertComponent } from './demos/components/alert/alert.component';

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
    UnlessDirective,
    TplContainerComponent,
    TplOutletComponent,
    ShadowComponent,
    ViewChildComponent,
    PanelComponent,
    ContentChildComponent,
    ContentPanelComponent,
    PipeComponent,
    ExponentialStrengthPipe,
    FlyingHeroesImpurePipe,
    LifeCycleComponent,
    ChangeComponent,
    ChangeChildComponent,
    ChangeGrandsonComponent,
    StyleComponent,
    TransferComponent,
    AlertComponent
  ],
  // entryComponents: [AlertComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
