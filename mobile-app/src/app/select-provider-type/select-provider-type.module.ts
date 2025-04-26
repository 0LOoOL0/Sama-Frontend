import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelectProviderTypePageRoutingModule } from './select-provider-type-routing.module';

import { SelectProviderTypePage } from './select-provider-type.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SelectProviderTypePageRoutingModule
  ],
  declarations: [SelectProviderTypePage]
})
export class SelectProviderTypePageModule {}
