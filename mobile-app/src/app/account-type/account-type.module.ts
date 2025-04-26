import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AccountTypePageRoutingModule } from './account-type-routing.module';

import { AccountTypePage } from './account-type.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AccountTypePageRoutingModule
  ],
  declarations: [AccountTypePage]
})
export class AccountTypePageModule {}
