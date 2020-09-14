import { NgModule } from '@angular/core';
import { NumberFormatPipe } from './number-format.pipe';



@NgModule({
  declarations: [NumberFormatPipe],
  exports: [NumberFormatPipe]
})
export class PipesModule { }
