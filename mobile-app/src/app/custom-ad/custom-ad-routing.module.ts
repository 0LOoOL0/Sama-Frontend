import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CustomAdPage } from './custom-ad.page';

const routes: Routes = [
  {
    path: '',
    component: CustomAdPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomAdPageRoutingModule {}
