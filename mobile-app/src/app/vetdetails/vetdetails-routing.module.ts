import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VetdetailsPage } from './vetdetails.page';

const routes: Routes = [
  {
    path: '',
    component: VetdetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VetdetailsPageRoutingModule {}
