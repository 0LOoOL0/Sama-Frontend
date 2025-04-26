import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule , ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LostformPageRoutingModule } from './lostform-routing.module';

import { LostformPage } from './lostform.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LostformPageRoutingModule, ReactiveFormsModule
  ],
  declarations: [LostformPage]
})
export class LostformPageModule {}
