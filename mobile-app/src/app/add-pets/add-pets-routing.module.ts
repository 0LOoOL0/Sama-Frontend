import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddPetsPage } from './add-pets.page';

const routes: Routes = [
  {
    path: '',
    component: AddPetsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddPetsPageRoutingModule {}
