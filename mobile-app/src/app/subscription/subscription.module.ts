import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { SubscriptionPageRoutingModule } from './subscription-routing.module';

import { SubscriptionPage } from './subscription.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SubscriptionPageRoutingModule,
  ],
  declarations: [SubscriptionPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SubscriptionPageModule {}
