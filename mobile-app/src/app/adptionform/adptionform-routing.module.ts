import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdptionformPage } from './adptionform.page';

const routes: Routes = [
  {
    path: '',
    component: AdptionformPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdptionformPageRoutingModule {}
