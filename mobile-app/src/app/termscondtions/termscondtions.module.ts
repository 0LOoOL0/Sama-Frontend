import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TermscondtionsPageRoutingModule } from './termscondtions-routing.module';

import { TermscondtionsPage } from './termscondtions.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TermscondtionsPageRoutingModule
  ],
  declarations: [TermscondtionsPage]
})
export class TermscondtionsPageModule {}
