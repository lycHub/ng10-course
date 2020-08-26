import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AddHeroComponent} from './add-hero.component';
import {HeroCanDeactivateGuard} from '../../../services/guards/hero-can-deactivate.guard';


const routes: Routes = [
  { path: '', component: AddHeroComponent, canDeactivate: [HeroCanDeactivateGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddHeroRoutingModule { }
