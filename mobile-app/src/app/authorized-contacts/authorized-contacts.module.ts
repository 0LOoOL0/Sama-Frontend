import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AuthorizedContactsPageRoutingModule } from './authorized-contacts-routing.module';

import { AuthorizedContactsPage } from './authorized-contacts.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AuthorizedContactsPageRoutingModule
  ],
  declarations: [AuthorizedContactsPage]
})
export class AuthorizedContactsPageModule {}
