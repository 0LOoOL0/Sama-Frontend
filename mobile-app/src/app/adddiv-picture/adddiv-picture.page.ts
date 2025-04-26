import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-adddiv-picture',
  templateUrl: './adddiv-picture.page.html',
  styleUrls: ['./adddiv-picture.page.scss'],
})
export class AdddivPicturePage implements OnInit {

  selectedFile: File | null = null;

  constructor() { }

  ngOnInit() { }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file && (file.type === 'image/jpeg' || file.type === 'image/png') && file.size <= 2 * 1024 * 1024) {
      this.selectedFile = file;
    } else {
      // Handle file validation errors
      alert('Please select a valid image file (JPG, PNG) with size up to 2 MB.');
    }
  }

  uploadAdImage() {
    if (this.selectedFile) {
      // Implement the logic to upload the image
      console.log('File ready for upload:', this.selectedFile);
    } else {
      alert('Please select an image file to upload.');
    }
  }
}