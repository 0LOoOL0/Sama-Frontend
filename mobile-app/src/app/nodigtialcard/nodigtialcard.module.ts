import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NodigtialcardPageRoutingModule } from './nodigtialcard-routing.module';

import { NodigtialcardPage } from './nodigtialcard.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NodigtialcardPageRoutingModule
  ],
  declarations: [NodigtialcardPage]
})
export class NodigtialcardPageModule {}
