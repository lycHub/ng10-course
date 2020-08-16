import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {NotFoundComponent} from './router-study/not-found/not-found.component';
import {ComposeMessageComponent} from './router-study/compose-message/compose-message.component';
import {AuthGuard} from './router-study/auth/auth.guard';

const namedRoutes = [
  {
    path: 'compose',
    component: ComposeMessageComponent,
    outlet: 'popup'
  }
]

const routes: Routes = [
  {
    path: 'admin',
    loadChildren: () => import('./router-study/admin/admin.module').then(m => m.AdminModule),
    canLoad: [AuthGuard]
  },
  { path: '', redirectTo: '/heroes', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes.concat(namedRoutes), {
    // enableTracing: true
    // onSameUrlNavigation: 'reload'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
