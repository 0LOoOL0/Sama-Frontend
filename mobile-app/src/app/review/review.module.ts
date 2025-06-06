import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Import ReactiveFormsModule here

import { IonicModule } from '@ionic/angular';

import { ReviewPageRoutingModule } from './review-routing.module';

import { ReviewPage } from './review.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule, // Add ReactiveFormsModule here
    IonicModule,
    ReviewPageRoutingModule
  ],
  declarations: [ReviewPage]
})
export class ReviewPageModule {}

