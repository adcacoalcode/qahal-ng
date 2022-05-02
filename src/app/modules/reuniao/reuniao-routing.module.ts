import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReuniaoComponent } from './pages/reuniao/reuniao.component';

const routes: Routes = [
  {
    path: '',
    component: ReuniaoComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReuniaoRoutingModule { }
