import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DrmainPage } from './drmain.page';

const routes: Routes = [
  {
    path: '',
    component: DrmainPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DrmainPageRoutingModule {}
