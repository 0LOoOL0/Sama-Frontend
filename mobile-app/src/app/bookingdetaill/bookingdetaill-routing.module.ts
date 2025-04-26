import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BookingdetaillPage } from './bookingdetaill.page';

const routes: Routes = [
  {
    path: '',
    component: BookingdetaillPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookingdetaillPageRoutingModule {}
