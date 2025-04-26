import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DiscounthistoryPage } from './discounthistory.page';

const routes: Routes = [
  {
    path: '',
    component: DiscounthistoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DiscounthistoryPageRoutingModule {}
