import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BookingdetaillPageRoutingModule } from './bookingdetaill-routing.module';

import { BookingdetaillPage } from './bookingdetaill.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BookingdetaillPageRoutingModule
  ],
  declarations: [BookingdetaillPage]
})
export class BookingdetaillPageModule {}
