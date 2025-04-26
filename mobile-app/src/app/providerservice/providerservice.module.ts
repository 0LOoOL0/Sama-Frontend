import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProviderservicePageRoutingModule } from './providerservice-routing.module';

import { ProviderservicePage } from './providerservice.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProviderservicePageRoutingModule
  ],
  declarations: [ProviderservicePage]
})
export class ProviderservicePageModule {}
