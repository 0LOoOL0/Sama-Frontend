import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProviderpromotionPage } from './providerpromotion.page';

const routes: Routes = [
  {
    path: '',
    component: ProviderpromotionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProviderpromotionPageRoutingModule {}
