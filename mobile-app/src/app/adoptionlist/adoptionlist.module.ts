import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdoptionlistPageRoutingModule } from './adoptionlist-routing.module';

import { AdoptionlistPage } from './adoptionlist.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdoptionlistPageRoutingModule
  ],
  declarations: [AdoptionlistPage]
})
export class AdoptionlistPageModule {}
