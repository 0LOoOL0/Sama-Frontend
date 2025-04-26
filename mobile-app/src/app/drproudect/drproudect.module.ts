import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DrproudectPageRoutingModule } from './drproudect-routing.module';

import { DrproudectPage } from './drproudect.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DrproudectPageRoutingModule
  ],
  declarations: [DrproudectPage]
})
export class DrproudectPageModule {}
