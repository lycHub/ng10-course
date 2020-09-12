import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AlbumsComponent} from './albums.component';

const routes: Routes = [
  { path: 'albums/:pinyin', component: AlbumsComponent, data: { title: '专辑列表' } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlbumsRoutingModule { }
