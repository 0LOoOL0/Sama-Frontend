import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CongratulationPagePage } from './congratulation-page.page';

const routes: Routes = [
  {
    path: '',
    component: CongratulationPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CongratulationPagePageRoutingModule {}
