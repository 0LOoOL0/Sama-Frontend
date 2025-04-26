import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { BookappointmentPageRoutingModule } from './bookappointment-routing.module';
import { BookappointmentPage } from './bookappointment.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BookappointmentPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [BookappointmentPage]
})
export class BookappointmentPageModule {}
