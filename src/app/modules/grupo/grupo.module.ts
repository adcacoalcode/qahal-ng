import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GrupoRoutingModule } from './grupo-routing.module';
import { GrupoListComponent } from './components/grupo-list/grupo-list.component';
import { GrupoComponent } from './pages/grupo/grupo.component';
import { GrupoFormComponent } from './components/grupo-form/grupo-form.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    GrupoListComponent,
    GrupoComponent,
    GrupoFormComponent
  ],
  imports: [
    CommonModule,
    GrupoRoutingModule,
    SharedModule
  ]
})
export class GrupoModule { }
