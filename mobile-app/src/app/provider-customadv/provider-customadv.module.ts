import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProviderCustomadvPageRoutingModule } from './provider-customadv-routing.module';

import { ProviderCustomadvPage } from './provider-customadv.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProviderCustomadvPageRoutingModule
  ],
  declarations: [ProviderCustomadvPage]
})
export class ProviderCustomadvPageModule {}
