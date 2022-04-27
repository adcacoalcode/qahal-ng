import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MembroComponent } from './pages/membro/membro.component';

const routes: Routes = [
  {
    path: '',
    component: MembroComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MembroRoutingModule { }
