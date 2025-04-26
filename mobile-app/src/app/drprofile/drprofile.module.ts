import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DrprofilePageRoutingModule } from './drprofile-routing.module';

import { DrprofilePage } from './drprofile.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DrprofilePageRoutingModule
  ],
  declarations: [DrprofilePage]
})
export class DrprofilePageModule {}
