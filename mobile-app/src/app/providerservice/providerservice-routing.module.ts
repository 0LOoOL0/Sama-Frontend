import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProviderservicePage } from './providerservice.page';

const routes: Routes = [
  {
    path: '',
    component: ProviderservicePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProviderservicePageRoutingModule {}
