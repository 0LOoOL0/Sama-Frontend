import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DrprofilePage } from './drprofile.page';

const routes: Routes = [
  {
    path: '',
    component: DrprofilePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DrprofilePageRoutingModule {}
