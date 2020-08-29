import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AddHeroComponent} from './add-hero.component';
import {HeroCanDeactivateGuard} from '../../../services/guards/hero-can-deactivate.guard';
import {HeroAuthGuard} from '../../../services/guards/hero-auth.guard';


const routes: Routes = [
  {
    path: '',
    component: AddHeroComponent,
    canDeactivate: [HeroCanDeactivateGuard],
    canActivate: [HeroAuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddHeroRoutingModule { }
