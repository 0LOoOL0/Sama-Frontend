import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProviderprofilesetupPage } from './providerprofilesetup.page';

const routes: Routes = [
  {
    path: '',
    component: ProviderprofilesetupPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProviderprofilesetupPageRoutingModule {}
