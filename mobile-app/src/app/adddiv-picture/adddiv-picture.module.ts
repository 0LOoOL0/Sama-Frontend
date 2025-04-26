import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdddivPicturePageRoutingModule } from './adddiv-picture-routing.module';

import { AdddivPicturePage } from './adddiv-picture.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdddivPicturePageRoutingModule
  ],
  declarations: [AdddivPicturePage]
})
export class AdddivPicturePageModule {}
