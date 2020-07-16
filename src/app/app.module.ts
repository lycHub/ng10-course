import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {DemosModule} from './demos/demos.module';
import {PagesModule} from './pages/pages.module';
import {HeroService} from './services/hero.service';
import {LoggerService} from './services/logger.service';
import {UserService} from './services/user.service';
import {UserLoggerService} from './services/user-logger.service';

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
    // LoggerService,
    UserService,
    // { provide: LoggerService, useClass: UserLoggerService }
    // UserLoggerService,
    {
      provide: UserLoggerService,
      useFactory(userServe: UserService) {
        return new UserLoggerService(userServe, 'factory msg');
      },
      deps: [UserService]
    },
    // { provide: LoggerService, useExisting: UserLoggerService },
    { provide: 'httpApi', useValue: '123.com' },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
