import { NgModule } from '@angular/core';
import { NumberFormatPipe } from './number-format.pipe';
import { SafeContentPipe } from './safe-content.pipe';



@NgModule({
  declarations: [NumberFormatPipe, SafeContentPipe],
  exports: [NumberFormatPipe, SafeContentPipe]
})
export class PipesModule { }
