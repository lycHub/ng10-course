import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AddUpdateHeroComponent} from '../add-update-hero/add-update-hero.component';
import {HeroCanDeactivateGuard} from '../../../services/guards/hero-can-deactivate.guard';
import {HeroAuthGuard} from '../../../services/guards/hero-auth.guard';


const routes: Routes = [
  {
    path: '',
    component: AddUpdateHeroComponent,
    canDeactivate: [HeroCanDeactivateGuard],
    canActivate: [HeroAuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UpdateHeroRoutingModule { }
