import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChangelanguagePageRoutingModule } from './changelanguage-routing.module';

import { ChangelanguagePage } from './changelanguage.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChangelanguagePageRoutingModule
  ],
  declarations: [ChangelanguagePage]
})
export class ChangelanguagePageModule {}
