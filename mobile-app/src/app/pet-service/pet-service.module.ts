import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PetServicePageRoutingModule } from './pet-service-routing.module';

import { PetServicePage } from './pet-service.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PetServicePageRoutingModule
  ],
  declarations: [PetServicePage]
})
export class PetServicePageModule {}
