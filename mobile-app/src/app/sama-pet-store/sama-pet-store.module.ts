import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SamaPetStorePageRoutingModule } from './sama-pet-store-routing.module';

import { SamaPetStorePage } from './sama-pet-store.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SamaPetStorePageRoutingModule
  ],
  declarations: [SamaPetStorePage]
})
export class SamaPetStorePageModule {}
