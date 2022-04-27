import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CargoRoutingModule } from './cargo-routing.module';
import { CargoListComponent } from './components/cargo-list/cargo-list.component';
import { CargoComponent } from './pages/cargo/cargo.component';
import { CargoFormComponent } from './components/cargo-form/cargo-form.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    CargoListComponent,
    CargoComponent,
    CargoFormComponent
  ],
  imports: [
    CommonModule,
    CargoRoutingModule,
    SharedModule
  ]
})
export class CargoModule { }
