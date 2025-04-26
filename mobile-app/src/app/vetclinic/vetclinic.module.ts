import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VetclinicPageRoutingModule } from './vetclinic-routing.module';

import { VetclinicPage } from './vetclinic.page';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, VetclinicPageRoutingModule],
  declarations: [VetclinicPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class VetclinicPageModule {}
