import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BookviewPageRoutingModule } from './bookview-routing.module';

import { BookviewPage } from './bookview.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BookviewPageRoutingModule
  ],
  declarations: [BookviewPage]
})
export class BookviewPageModule {}
