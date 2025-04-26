import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MangestorePageRoutingModule } from './mangestore-routing.module';

import { MangestorePage } from './mangestore.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MangestorePageRoutingModule
  ],
  declarations: [MangestorePage]
})
export class MangestorePageModule {}
