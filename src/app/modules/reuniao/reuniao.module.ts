import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReuniaoRoutingModule } from './reuniao-routing.module';
import { ReuniaoListComponent } from './components/reuniao-list/reuniao-list.component';
import { ReuniaoComponent } from './pages/reuniao/reuniao.component';
import { ReuniaoFormComponent } from './components/reuniao-form/reuniao-form.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    ReuniaoListComponent,
    ReuniaoComponent,
    ReuniaoFormComponent
  ],
  imports: [
    CommonModule,
    ReuniaoRoutingModule,
    SharedModule
  ]
})
export class ReuniaoModule { }
