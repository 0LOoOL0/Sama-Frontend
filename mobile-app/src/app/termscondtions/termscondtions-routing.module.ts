import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TermscondtionsPage } from './termscondtions.page';

const routes: Routes = [
  {
    path: '',
    component: TermscondtionsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TermscondtionsPageRoutingModule {}
