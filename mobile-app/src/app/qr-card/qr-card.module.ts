import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QRCardPageRoutingModule } from './qr-card-routing.module';

import { QRCardPage } from './qr-card.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QRCardPageRoutingModule
  ],
  declarations: [QRCardPage]
})
export class QRCardPageModule {}
