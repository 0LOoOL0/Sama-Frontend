import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyCardDetailsPageRoutingModule } from './my-card-details-routing.module';

import { MyCardDetailsPage } from './my-card-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyCardDetailsPageRoutingModule
  ],
  declarations: [MyCardDetailsPage]
})
export class MyCardDetailsPageModule {}
