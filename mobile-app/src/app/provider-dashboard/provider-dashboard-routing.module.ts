import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProviderDashboardPage } from './provider-dashboard.page';

const routes: Routes = [
  {
    path: '',
    component: ProviderDashboardPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProviderDashboardPageRoutingModule {}
