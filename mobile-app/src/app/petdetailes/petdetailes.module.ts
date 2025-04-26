import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PetdetailesPageRoutingModule } from './petdetailes-routing.module';

import { PetdetailesPage } from './petdetailes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PetdetailesPageRoutingModule
  ],
  declarations: [PetdetailesPage]
})
export class PetdetailesPageModule {}
