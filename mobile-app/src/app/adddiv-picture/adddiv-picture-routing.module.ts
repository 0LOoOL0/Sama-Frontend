import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdddivPicturePage } from './adddiv-picture.page';

const routes: Routes = [
  {
    path: '',
    component: AdddivPicturePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdddivPicturePageRoutingModule {}
