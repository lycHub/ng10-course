import { NgModule } from '@angular/core';
import {Routes, RouterModule, PreloadAllModules} from '@angular/router';
import {NotFoundComponent} from './router-study/not-found/not-found.component';
import {ComposeMessageComponent} from './router-study/compose-message/compose-message.component';
import {AuthGuard} from './router-study/auth/auth.guard';
import {SelectivePreloadingStrategyService} from './services/selective-preloading-strategy.service';

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
    // canLoad: [AuthGuard]
    data: { preload: true }
  },
  {
    path: 'crisis-center',
    loadChildren: () => import('./router-study/crisis-center/crisis-center.module').then(m => m.CrisisCenterModule),
    data: { preload: true }
  },
  { path: '', redirectTo: '/heroes', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes.concat(namedRoutes), {
    // enableTracing: true
    preloadingStrategy: SelectivePreloadingStrategyService
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
