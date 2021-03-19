import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanDeactivate} from '@angular/router';
import {CrisisDetailComponent} from './crisis-detail/crisis-detail.component';
@Injectable({
  providedIn: 'root'
})
export class CanDeactivateGuard implements CanDeactivate<CrisisDetailComponent> {
  canDeactivate(
    component: CrisisDetailComponent,
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
    ) {
    console.log('url', state.url);
    return component?.canDeactivate();
  }
}
