import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MarketInfoPageRoutingModule } from './marketinfo-routing.module';
import { MarketInfoPage } from './marketinfo.page';

@NgModule({
  imports: [
    IonicModule.forRoot(), 
    CommonModule,
    FormsModule,
    IonicModule,
    MarketInfoPageRoutingModule
  ],
  declarations: [MarketInfoPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MarketInfoPageModule {}
