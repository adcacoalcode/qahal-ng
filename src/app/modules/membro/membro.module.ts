import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MembroRoutingModule } from './membro-routing.module';
import { MembroListComponent } from './components/membro-list/membro-list.component';
import { MembroComponent } from './pages/membro/membro.component';
import { MembroFormComponent } from './components/membro-form/membro-form.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    MembroListComponent,
    MembroComponent,
    MembroFormComponent
  ],
  imports: [
    CommonModule,
    MembroRoutingModule,
    SharedModule
  ]
})
export class MembroModule { }
