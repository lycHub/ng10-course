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
        data: { title: '英雄列表', breadcrumb: ['首页', '英雄列表'] }
      },
      {
        path: 'add-hero',
        loadChildren: () => import('./add-hero/add-hero.module').then(m => m.AddHeroModule),
        data: { title: '新增英雄', breadcrumb: ['首页', '新增英雄'] }
      },
      {
        path: 'update-hero',
        loadChildren: () => import('./update-hero/update-hero.module').then(m => m.UpdateHeroModule),
        data: { title: '修改英雄', breadcrumb: ['首页', '修改英雄'] }
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