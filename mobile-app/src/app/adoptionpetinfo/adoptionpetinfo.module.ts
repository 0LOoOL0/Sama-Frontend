import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdoptionpetinfoPageRoutingModule } from './adoptionpetinfo-routing.module';

import { AdoptionpetinfoPage } from './adoptionpetinfo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdoptionpetinfoPageRoutingModule
  ],
  declarations: [AdoptionpetinfoPage]
})
export class AdoptionpetinfoPageModule {}
