import { NgModule } from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/home/heroes', pathMatch: 'full' },
  { path: '**', redirectTo: '/home/heroes' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
