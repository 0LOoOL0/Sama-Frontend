import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { removeCircle } from 'ionicons/icons';
import { AddPetDocPageRoutingModule } from './add-pet-doc-routing.module';

import { AddPetDocPage } from './add-pet-doc.page';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, AddPetDocPageRoutingModule],
  declarations: [AddPetDocPage],
})
export class AddPetDocPageModule {}
