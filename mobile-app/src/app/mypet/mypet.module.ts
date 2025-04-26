import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MypetPageRoutingModule } from './mypet-routing.module';

import { MypetPage } from './mypet.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MypetPageRoutingModule
  ],
  declarations: [MypetPage]
})
export class MypetPageModule {}
