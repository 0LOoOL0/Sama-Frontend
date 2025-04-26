import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WaitApprovalPageRoutingModule } from './wait-approval-routing.module';

import { WaitApprovalPage } from './wait-approval.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WaitApprovalPageRoutingModule
  ],
  declarations: [WaitApprovalPage]
})
export class WaitApprovalPageModule {}
