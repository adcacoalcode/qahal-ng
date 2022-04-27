import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IgrejaRoutingModule } from './igreja-routing.module';
import { IgrejaComponent } from './pages/igreja/igreja.component';
import { IgrejaListComponent } from './components/igreja-list/igreja-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { IgrejaFormComponent } from './components/igreja-form/igreja-form.component';


@NgModule({
  declarations: [
    IgrejaComponent,
    IgrejaListComponent,
    IgrejaFormComponent
  ],
  imports: [
    CommonModule,
    IgrejaRoutingModule,
    SharedModule,
  ]
})
export class IgrejaModule { }
