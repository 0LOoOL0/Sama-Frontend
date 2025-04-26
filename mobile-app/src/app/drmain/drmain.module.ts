import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { DrmainPageRoutingModule } from './drmain-routing.module';
import { DrmainPage } from './drmain.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DrmainPageRoutingModule
  ],
  declarations: [DrmainPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DrmainPageModule {}
