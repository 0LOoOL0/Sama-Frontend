import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProvidercreactaccPageRoutingModule } from './providercreactacc-routing.module';

import { ProvidercreactaccPage } from './providercreactacc.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProvidercreactaccPageRoutingModule
  ],
  declarations: [ProvidercreactaccPage]
})
export class ProvidercreactaccPageModule {}
