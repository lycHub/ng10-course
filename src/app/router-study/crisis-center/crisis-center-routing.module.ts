import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CrisisListComponent} from './crisis-list/crisis-list.component';
import {CrisisCenterComponent} from './crisis-center.component';
import {CrisisCenterHomeComponent} from './crisis-center-home/crisis-center-home.component';
import {CrisisDetailComponent} from './crisis-detail/crisis-detail.component';
import {CanDeactivateGuard} from './can-deactivate.guard';
import {CrisisDetailResolverService} from './crisis-detail-resolver.service';


const routes: Routes = [
  {
    path: 'crisis-center',
    component: CrisisCenterComponent,
    children: [
      {
        path: 'list',
        component: CrisisListComponent,
        children: [
          {
            path: ':id',
            component: CrisisDetailComponent,
            canDeactivate: [CanDeactivateGuard],
            resolve: {
              crisis: CrisisDetailResolverService
            },
            data: {
              name: '张三'
            }
          },
          {
            path: '',
            component: CrisisCenterHomeComponent
          }
        ]
      },
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CrisisCenterRoutingModule { }
