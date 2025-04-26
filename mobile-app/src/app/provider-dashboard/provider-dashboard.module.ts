import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { Chart } from 'chart.js';
import { ProviderDashboardPageRoutingModule } from './provider-dashboard-routing.module';

import { ProviderDashboardPage } from './provider-dashboard.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProviderDashboardPageRoutingModule
  ],
  declarations: [ProviderDashboardPage]
})
export class ProviderDashboardPageModule {}
