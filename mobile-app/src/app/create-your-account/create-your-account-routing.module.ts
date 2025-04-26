import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateYourAccountPage } from './create-your-account.page';

const routes: Routes = [
  {
    path: '',
    component: CreateYourAccountPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateYourAccountPageRoutingModule {}
