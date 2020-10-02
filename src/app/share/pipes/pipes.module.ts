import { NgModule } from '@angular/core';
import { NumberFormatPipe } from './number-format.pipe';
import { SafeContentPipe } from './safe-content.pipe';
import { NumberLoopPipe } from './number-loop.pipe';



@NgModule({
  declarations: [NumberFormatPipe, SafeContentPipe, NumberLoopPipe],
  exports: [NumberFormatPipe, SafeContentPipe, NumberLoopPipe]
})
export class PipesModule { }
