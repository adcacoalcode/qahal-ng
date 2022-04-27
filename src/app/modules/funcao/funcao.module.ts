import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FuncaoRoutingModule } from './funcao-routing.module';
import { FuncaoListComponent } from './components/funcao-list/funcao-list.component';
import { FuncaoComponent } from './pages/funcao/funcao.component';
import { FuncaoFormComponent } from './components/funcao-form/funcao-form.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    FuncaoListComponent,
    FuncaoComponent,
    FuncaoFormComponent
  ],
  imports: [
    CommonModule,
    FuncaoRoutingModule,
    SharedModule
  ]
})
export class FuncaoModule { }
