import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-change-image-modal',
  templateUrl: './change-image-modal.component.html',
})
export class ChangeImageModalComponent {
  @Input() petId: number | undefined;
  selectedFile: File | null = null;

  constructor(private modalController: ModalController) {}

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  approve() {
    if (this.selectedFile) {
      this.modalController.dismiss({
        approved: true,
        file: this.selectedFile,
      });
    } else {
      console.error('No file selected');
    }
  }

  dismiss() {
    this.modalController.dismiss({
      approved: false,
    });
  }
}
