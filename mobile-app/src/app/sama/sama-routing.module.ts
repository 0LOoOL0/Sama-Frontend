import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SamaPage } from './sama.page';

const routes: Routes = [
  {
    path: '',
    component: SamaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SamaPageRoutingModule {}
