import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DrproudectPage } from './drproudect.page';

const routes: Routes = [
  {
    path: '',
    component: DrproudectPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DrproudectPageRoutingModule {}
