import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CongratulationPagePageRoutingModule } from './congratulation-page-routing.module';

import { CongratulationPagePage } from './congratulation-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CongratulationPagePageRoutingModule
  ],
  declarations: [CongratulationPagePage]
})
export class CongratulationPagePageModule {}
