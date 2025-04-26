import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProvidercreactaccPage } from './providercreactacc.page';

const routes: Routes = [
  {
    path: '',
    component: ProvidercreactaccPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProvidercreactaccPageRoutingModule {}
