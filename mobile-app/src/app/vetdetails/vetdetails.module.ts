import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VetdetailsPageRoutingModule } from './vetdetails-routing.module';

import { VetdetailsPage } from './vetdetails.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VetdetailsPageRoutingModule,
  ],
  declarations: [VetdetailsPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class VetdetailsPageModule {}
