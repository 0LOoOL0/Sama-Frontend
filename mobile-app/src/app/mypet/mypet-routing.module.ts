import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MypetPage } from './mypet.page';

const routes: Routes = [
  {
    path: '',
    component: MypetPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MypetPageRoutingModule {}
