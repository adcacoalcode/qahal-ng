import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuarioRoutingModule } from './usuario-routing.module';
import { UsuarioFormComponent } from './components/usuario-form/usuario-form.component';
import { UsuarioListComponent } from './components/usuario-list/usuario-list.component';


@NgModule({
  declarations: [
    UsuarioFormComponent,
    UsuarioListComponent
  ],
  imports: [
    CommonModule,
    UsuarioRoutingModule
  ]
})
export class UsuarioModule { }
