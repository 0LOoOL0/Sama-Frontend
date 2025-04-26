import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BuycouponPage } from './buycoupon.page';

const routes: Routes = [
  {
    path: '',
    component: BuycouponPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BuycouponPageRoutingModule {}
