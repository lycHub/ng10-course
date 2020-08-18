import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home.component';
import {HeroesComponent} from './heroes/heroes.component';


const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    data: { title: '首页' },
    children: [
      {
        path: 'heroes',
        component: HeroesComponent,
        data: { title: '英雄列表', breadcrumb: ['页面', '英雄列表'] }
      },
      { path: '', redirectTo: 'heroes', pathMatch: 'full' },
      { path: '**', redirectTo: 'heroes' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
