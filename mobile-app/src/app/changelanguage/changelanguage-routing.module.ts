import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChangelanguagePage } from './changelanguage.page';

const routes: Routes = [
  {
    path: '',
    component: ChangelanguagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChangelanguagePageRoutingModule {}
