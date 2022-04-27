import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FuncaoComponent } from './pages/funcao/funcao.component';

const routes: Routes = [
  {
    path: '',
    component: FuncaoComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FuncaoRoutingModule { }
