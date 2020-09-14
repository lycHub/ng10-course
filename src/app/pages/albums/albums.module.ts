import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlbumsRoutingModule } from './albums-routing.module';
import { AlbumsComponent } from './albums.component';
import {DirectivesModule} from '../../share/directives/directives.module';
import {PipesModule} from '../../share/pipes/pipes.module';


@NgModule({
  declarations: [AlbumsComponent],
  imports: [
    CommonModule,
    AlbumsRoutingModule,
    DirectivesModule,
    PipesModule
  ]
})
export class AlbumsModule { }
