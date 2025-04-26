import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DrlistPage } from './drlist.page';

const routes: Routes = [
  {
    path: '',
    component: DrlistPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DrlistPageRoutingModule {}
