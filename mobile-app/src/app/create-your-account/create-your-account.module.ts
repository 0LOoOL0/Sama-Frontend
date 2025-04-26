import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { CreateYourAccountPageRoutingModule } from './create-your-account-routing.module';

import { CreateYourAccountPage } from './create-your-account.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateYourAccountPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [CreateYourAccountPage]
})
export class CreateYourAccountPageModule {}
