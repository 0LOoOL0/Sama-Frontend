import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProviderProfile1PageRoutingModule } from './provider-profile1-routing.module';

import { ProviderProfile1Page } from './provider-profile1.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProviderProfile1PageRoutingModule
  ],
  declarations: [ProviderProfile1Page]
})
export class ProviderProfile1PageModule {}
