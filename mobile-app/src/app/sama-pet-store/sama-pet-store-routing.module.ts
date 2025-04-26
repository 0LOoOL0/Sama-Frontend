import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SamaPetStorePage } from './sama-pet-store.page';

const routes: Routes = [
  {
    path: '',
    component: SamaPetStorePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SamaPetStorePageRoutingModule {}
