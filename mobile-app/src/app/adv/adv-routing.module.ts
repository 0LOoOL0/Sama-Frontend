import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdvPage } from './adv.page';

const routes: Routes = [
  {
    path: '',
    component: AdvPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdvPageRoutingModule {}
