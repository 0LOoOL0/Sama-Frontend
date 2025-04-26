import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LostpetinfoPage } from './lostpetinfo.page';

const routes: Routes = [
  {
    path: '',
    component: LostpetinfoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LostpetinfoPageRoutingModule {}
