import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TransferOwnershipPage } from './transfer-ownership.page';

const routes: Routes = [
  {
    path: '',
    component: TransferOwnershipPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TransferOwnershipPageRoutingModule {}
