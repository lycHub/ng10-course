import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AddHeroComponent} from './add-hero.component';


const routes: Routes = [
  { path: '', component: AddHeroComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddHeroRoutingModule { }
