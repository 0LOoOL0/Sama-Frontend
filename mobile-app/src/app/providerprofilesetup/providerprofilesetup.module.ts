import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProviderprofilesetupPageRoutingModule } from './providerprofilesetup-routing.module';

import { ProviderprofilesetupPage } from './providerprofilesetup.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProviderprofilesetupPageRoutingModule
  ],
  declarations: [ProviderprofilesetupPage]
})
export class ProviderprofilesetupPageModule {}
