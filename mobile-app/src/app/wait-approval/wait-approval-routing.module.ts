import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WaitApprovalPage } from './wait-approval.page';

const routes: Routes = [
  {
    path: '',
    component: WaitApprovalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WaitApprovalPageRoutingModule {}
