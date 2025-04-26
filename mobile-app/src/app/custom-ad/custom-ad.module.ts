import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
 
import { IonicModule } from '@ionic/angular';

import { CustomAdPageRoutingModule } from './custom-ad-routing.module';

import { CustomAdPage } from './custom-ad.page';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CustomAdPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [CustomAdPage]
})
export class CustomAdPageModule {}
