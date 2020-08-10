import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {NotFoundComponent} from './router-study/not-found/not-found.component';
import {ComposeMessageComponent} from './router-study/compose-message/compose-message.component';

const namedRoutes = [
  {
    path: 'compose',
    component: ComposeMessageComponent,
    outlet: 'popup'
  }
]

const routes: Routes = [
  { path: '', redirectTo: '/heroes', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent },
  {
    path: 'compose',
    component: ComposeMessageComponent,
    outlet: 'popup'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes.concat(namedRoutes), {
    // enableTracing: true
    // onSameUrlNavigation: 'reload'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
