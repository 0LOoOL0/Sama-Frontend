import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SamaPageRoutingModule } from './sama-routing.module';

import { SamaPage } from './sama.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SamaPageRoutingModule
  ],
  declarations: [SamaPage]
})
export class SamaPageModule {}
