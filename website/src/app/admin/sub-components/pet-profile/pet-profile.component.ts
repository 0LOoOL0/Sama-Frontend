import { Component } from '@angular/core';

@Component({
  selector: 'app-pet-profile',
  standalone: true,
  imports: [],
  templateUrl: './pet-profile.component.html',
  styleUrl: './pet-profile.component.scss'
})
export class PetProfileComponent {

  onPrintCard() {
    console.log('Print Card button clicked');
  }

  onPrintInvoice() {
    console.log('Print Invoice button clicked');
  }

  onUploadDocument() {
    console.log('Upload button clicked');
  }

  onDownloadDocument() {
    console.log('Download button clicked');
  }

}
