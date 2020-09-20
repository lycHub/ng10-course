import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AlbumComponent} from './album.component';

const routes: Routes = [
  { path: '', component: AlbumComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlbumRoutingModule { }
