import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {DemosModule} from './demos/demos.module';
import {PagesModule} from './pages/pages.module';
import {LoggerService} from './demos/components/test-service/logger.service';
import {BetterLoggerService} from './demos/components/test-service/better-logger.service';
import {APP_CONFIG} from './demos/components/test-service/token';
import {FlowerService} from './demos/components/test-service/flower.service';
import {MobileService} from './demos/components/test-service/mobile/mobile.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DemosModule,
    PagesModule
  ],
  providers: [
    // MobileService,
    // LoggerService
    BetterLoggerService,
    // { provide: LoggerService, useExisting: BetterLoggerService }
    { provide: LoggerService, useValue: '一个简单的value' },
    { provide: 'httpApi', useValue: 'http:localhost:3333' },
    { provide: APP_CONFIG, useValue: 'token value' },
    {
      provide: FlowerService,
      useFactory(betterServe: BetterLoggerService) {
        return new FlowerService(betterServe);
      },
      deps: [BetterLoggerService]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
