import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SellingPetFormPageRoutingModule } from './selling-pet-form-routing.module';

import { SellingPetFormPage } from './selling-pet-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SellingPetFormPageRoutingModule
  ],
  declarations: [SellingPetFormPage]
})
export class SellingPetFormPageModule {}
