import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ChangeImageModalComponent } from './change-image-modal/change-image-modal.component';
import { TestComponent } from './test/test.component';

const components = [TestComponent, ChangeImageModalComponent]; // Add ChangeImageModalComponent here

@NgModule({
  declarations: components, // Declare all components here
  imports: [
    CommonModule,
    FormsModule, // Include FormsModule if you need it
    IonicModule,
  ],
  exports: components, // Export all components here
})
export class ComponentsModule {}
