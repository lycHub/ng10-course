import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UpdateHeroComponent} from './update-hero.component';


const routes: Routes = [
  { path: '', component: UpdateHeroComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UpdateHeroRoutingModule { }
