import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../core/guards/auth.guard';
import { IgrejaComponent } from './pages/igreja/igreja.component';

const routes: Routes = [
  {
    path: '',
    component: IgrejaComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IgrejaRoutingModule { }
