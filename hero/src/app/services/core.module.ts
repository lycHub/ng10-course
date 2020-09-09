import {ModuleWithProviders, NgModule, Optional, SkipSelf} from '@angular/core';
import {LogService} from './log.service';



@NgModule({
  declarations: [],
  imports: [],
  exports: [],
  providers: [LogService]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only');
    }
  }
}
