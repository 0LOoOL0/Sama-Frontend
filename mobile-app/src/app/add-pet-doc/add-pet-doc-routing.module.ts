import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddPetDocPage } from './add-pet-doc.page';

const routes: Routes = [
  {
    path: '',
    component: AddPetDocPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddPetDocPageRoutingModule {}
