import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LostpetinfoPageRoutingModule } from './lostpetinfo-routing.module';

import { LostpetinfoPage } from './lostpetinfo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LostpetinfoPageRoutingModule
  ],
  declarations: [LostpetinfoPage]
})
export class LostpetinfoPageModule {}
