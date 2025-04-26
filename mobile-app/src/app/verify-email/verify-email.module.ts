import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { VerifyEmailPageRoutingModule } from './verify-email-routing.module';

import { VerifyEmailPage } from './verify-email.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VerifyEmailPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [VerifyEmailPage]
})
export class VerifyEmailPageModule {}
