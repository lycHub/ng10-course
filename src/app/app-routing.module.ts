import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CrisisListComponent} from './router-study/crisis-list/crisis-list.component';
import {HeroListComponent} from './router-study/hero-list/hero-list.component';
import {PageNotFoundComponent} from './router-study/page-not-found/page-not-found.component';


const routes: Routes = [
  { path: 'crisis-center', component: CrisisListComponent },
  { path: 'heroes', component: HeroListComponent },
  // 如果pathMatch设为prefix，则不存在的path也会匹配到这里
  { path: '',   redirectTo: '/heroes', pathMatch: 'prefix' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
