import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IgrejaRoutingModule } from './igreja-routing.module';
import { IgrejaComponent } from './pages/igreja/igreja.component';


@NgModule({
  declarations: [
    IgrejaComponent
  ],
  imports: [
    CommonModule,
    IgrejaRoutingModule
  ]
})
export class IgrejaModule { }
