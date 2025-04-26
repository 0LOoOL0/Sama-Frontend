import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Sama1PageRoutingModule } from './sama1-routing.module';

import { Sama1Page } from './sama1.page';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, Sama1PageRoutingModule],
  declarations: [Sama1Page],
})
export class Sama1PageModule {}
