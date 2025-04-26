import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProviderCustomadvPage } from './provider-customadv.page';

const routes: Routes = [
  {
    path: '',
    component: ProviderCustomadvPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProviderCustomadvPageRoutingModule {}
