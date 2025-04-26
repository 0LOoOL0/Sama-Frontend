import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReactiveFormsModule } from '@angular/forms';
import { PetProfilePageRoutingModule } from './pet-profile-routing.module';
import { PetProfilePage } from './pet-profile.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PetProfilePageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [PetProfilePage],
})
export class PetProfilePageModule {}
