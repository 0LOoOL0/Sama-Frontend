import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LostformPage } from './lostform.page';

const routes: Routes = [
  {
    path: '',
    component: LostformPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LostformPageRoutingModule {}
