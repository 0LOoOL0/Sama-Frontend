import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PetdetailesPage } from './petdetailes.page';

const routes: Routes = [
  {
    path: '',
    component: PetdetailesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PetdetailesPageRoutingModule {}
