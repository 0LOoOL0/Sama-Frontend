import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyCardDetailsPage } from './my-card-details.page';

const routes: Routes = [
  {
    path: '',
    component: MyCardDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyCardDetailsPageRoutingModule {}
