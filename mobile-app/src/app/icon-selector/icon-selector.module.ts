import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IconSelectorPageRoutingModule } from './icon-selector-routing.module';

import { IconSelectorPage } from './icon-selector.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IconSelectorPageRoutingModule
  ],
  declarations: [IconSelectorPage]
})
export class IconSelectorPageModule {}
