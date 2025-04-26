import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdoptionpetinfoPage } from './adoptionpetinfo.page';

const routes: Routes = [
  {
    path: '',
    component: AdoptionpetinfoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdoptionpetinfoPageRoutingModule {}
