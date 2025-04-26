import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdptionformPageRoutingModule } from './adptionform-routing.module';

import { AdptionformPage } from './adptionform.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdptionformPageRoutingModule
  ],
  declarations: [AdptionformPage]
})
export class AdptionformPageModule {}
