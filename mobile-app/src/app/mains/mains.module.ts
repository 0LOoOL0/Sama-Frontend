import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MainsPageRoutingModule } from './mains-routing.module';

import { MainsPage } from './mains.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MainsPageRoutingModule
  ],
  declarations: [MainsPage]
})
export class MainsPageModule {}
