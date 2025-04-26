import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DiscounthistoryPageRoutingModule } from './discounthistory-routing.module';

import { DiscounthistoryPage } from './discounthistory.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DiscounthistoryPageRoutingModule
  ],
  declarations: [DiscounthistoryPage]
})
export class DiscounthistoryPageModule {}
