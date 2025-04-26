import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SelectprovidertypePage } from './selectprovidertype.page';

const routes: Routes = [
  {
    path: '',
    component: SelectprovidertypePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SelectprovidertypePageRoutingModule {}
