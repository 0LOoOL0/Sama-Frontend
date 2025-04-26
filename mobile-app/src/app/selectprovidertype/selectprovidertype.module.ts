import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelectprovidertypePageRoutingModule } from './selectprovidertype-routing.module';

import { SelectprovidertypePage } from './selectprovidertype.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SelectprovidertypePageRoutingModule
  ],
  declarations: [SelectprovidertypePage]
})
export class SelectprovidertypePageModule {}
