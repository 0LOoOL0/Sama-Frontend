import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SelectProviderTypePage } from './select-provider-type.page';

const routes: Routes = [
  {
    path: '',
    component: SelectProviderTypePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SelectProviderTypePageRoutingModule {}
