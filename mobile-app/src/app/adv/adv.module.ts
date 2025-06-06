import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AdvPageRoutingModule } from './adv-routing.module';
import { AdvPage } from './adv.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdvPageRoutingModule,
    TranslateModule
  ],
  declarations: [AdvPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AdvPageModule {}
