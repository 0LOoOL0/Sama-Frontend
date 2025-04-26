import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BuycouponPageRoutingModule } from './buycoupon-routing.module';

import { BuycouponPage } from './buycoupon.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BuycouponPageRoutingModule
  ],
  declarations: [BuycouponPage]
})
export class BuycouponPageModule {}
