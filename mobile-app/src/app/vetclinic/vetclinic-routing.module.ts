import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VetclinicPage } from './vetclinic.page';

const routes: Routes = [
  {
    path: '',
    component: VetclinicPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VetclinicPageRoutingModule {}
