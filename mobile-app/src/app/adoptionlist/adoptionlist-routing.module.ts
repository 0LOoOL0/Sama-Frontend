import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdoptionlistPage } from './adoptionlist.page';

const routes: Routes = [
  {
    path: '',
    component: AdoptionlistPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdoptionlistPageRoutingModule {}
