import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NodigtialcardPage } from './nodigtialcard.page';

const routes: Routes = [
  {
    path: '',
    component: NodigtialcardPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NodigtialcardPageRoutingModule {}
