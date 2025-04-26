import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainsPage } from './mains.page';

const routes: Routes = [
  {
    path: '',
    component: MainsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainsPageRoutingModule {}
