import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckboxComponent } from './checkbox.component';
import { CheckboxGroupComponent } from './checkbox-group.component';



@NgModule({
  declarations: [CheckboxComponent, CheckboxGroupComponent],
  imports: [
    CommonModule
  ],
  exports: [CheckboxComponent, CheckboxGroupComponent]
})
export class CheckboxModule { }
