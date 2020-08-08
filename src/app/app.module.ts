import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {DemosModule} from './demos/demos.module';
import {PagesModule} from './pages/pages.module';
import { HeroListComponent } from './router-study/heroes/hero-list/hero-list.component';
import { CrisisListComponent } from './router-study/crisis-center/crisis-list/crisis-list.component';
import {RouterModule, Routes} from '@angular/router';
import { NotFoundComponent } from './router-study/not-found/not-found.component';

const routes: Routes = [
  { path: 'crisis-center', component: CrisisListComponent },
  { path: 'heroes', component: HeroListComponent },
  { path: '', redirectTo: '/heroes', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HeroListComponent,
    CrisisListComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    // AppRoutingModule,
    RouterModule.forRoot(routes),
    DemosModule,
    PagesModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
