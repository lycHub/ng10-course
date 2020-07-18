import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DialogComponent} from './dialog/dialog.component';
import {SizerComponent} from './sizer/sizer.component';
import {IfComponent} from './if/if.component';
import {SwitchComponent} from './switch/switch.component';
import {ForComponent} from './for/for.component';
import {TplVarComponent} from './tpl-var/tpl-var.component';
import {TplOperatorsComponent} from './tpl-operators/tpl-operators.component';
import {TransferPanelComponent} from './transfer/transfer-panel/transfer-panel.component';
import {ExampleComponent} from '../example/example.component';
import {StructuralComponent} from './structural/structural.component';
import {TplContainerComponent} from './tpl-container/tpl-container.component';
import {TplOutletComponent} from './tpl-outlet/tpl-outlet.component';
import {ShadowComponent} from './shadow/shadow.component';
import {ViewChildComponent} from './view-child/view-child.component';
import {PanelComponent} from './view-child/panel/panel.component';
import {ContentChildComponent} from './content-child/content-child.component';
import {ContentPanelComponent} from './content-child/panel/panel.component';
import {PipeComponent} from './pipe/pipe.component';
import {LifeCycleComponent} from './life-cycle/life-cycle.component';
import {ChangeComponent} from './change-detection/change/change.component';
import {ChangeChildComponent} from './change-detection/change-child/change-child.component';
import {ChangeGrandsonComponent} from './change-detection/change-grandson/change-grandson.component';
import {StyleComponent} from './style/style.component';
import {TransferComponent} from './transfer/transfer.component';
import {AlertComponent} from './alert/alert.component';
import {PipeModule} from '../pipes/pipe.module';
import {FormsModule} from '@angular/forms';
import { FlowerComponent } from './test-service/flower/flower.component';

@NgModule({
  declarations: [
    // FlyingHeroesImpurePipe,
    DialogComponent,
    SizerComponent,
    IfComponent,
    SwitchComponent,
    ForComponent,
    TplVarComponent,
    TplOperatorsComponent,
    TransferPanelComponent,
    ExampleComponent,
    StructuralComponent,
    TplContainerComponent,
    TplOutletComponent,
    ShadowComponent,
    ViewChildComponent,
    PanelComponent,
    ContentChildComponent,
    ContentPanelComponent,
    PipeComponent,
    LifeCycleComponent,
    ChangeComponent,
    ChangeChildComponent,
    ChangeGrandsonComponent,
    StyleComponent,
    TransferComponent,
    AlertComponent,
    FlowerComponent
  ],
  imports: [
    CommonModule,
    PipeModule,
    FormsModule
  ],
  exports: [
    // FlyingHeroesImpurePipe,
    DialogComponent,
    SizerComponent,
    IfComponent,
    SwitchComponent,
    ForComponent,
    TplVarComponent,
    TplOperatorsComponent,
    TransferPanelComponent,
    ExampleComponent,
    StructuralComponent,
    TplContainerComponent,
    TplOutletComponent,
    ShadowComponent,
    ViewChildComponent,
    PanelComponent,
    ContentChildComponent,
    ContentPanelComponent,
    PipeComponent,
    LifeCycleComponent,
    ChangeComponent,
    ChangeChildComponent,
    ChangeGrandsonComponent,
    StyleComponent,
    TransferComponent,
    AlertComponent,
    FlowerComponent
  ],
})
export class ComponentsModule { }
