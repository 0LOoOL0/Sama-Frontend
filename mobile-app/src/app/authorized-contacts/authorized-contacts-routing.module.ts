import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthorizedContactsPage } from './authorized-contacts.page';

const routes: Routes = [
  {
    path: '',
    component: AuthorizedContactsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthorizedContactsPageRoutingModule {}
