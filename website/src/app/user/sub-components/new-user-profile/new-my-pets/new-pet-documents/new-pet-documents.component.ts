import { Component,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

interface Pet {
  name: string;
  image: string;
  isVip: boolean;
}

interface Document {
  title: string;
  type: 'word' | 'pdf' | 'image';
  thumbnail: string;
}

@Component({
  selector: 'app-new-pet-documents',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './new-pet-documents.component.html',
  styleUrl: './new-pet-documents.component.css'
})

export class NewPetDocumentsComponent implements OnInit {


  selectedFile: File | null = null;

    constructor(private router: Router) { }
  pets: Pet[] = [
    { name: 'Add New Pet', image: 'assets/add-icon.png', isVip: false },
    { name: 'Jiffy', image: 'assets/jiffy.jpg', isVip: false },
    { name: 'Mochi', image: 'assets/mochi.jpg', isVip: true },
    { name: 'Captain', image: 'assets/captain.jpg', isVip: true },
    { name: 'Lucy', image: 'assets/lucy.jpg', isVip: false },
  ];

  selectedPet: Pet = this.pets[2]; // Default to Mochi

  documents: Document[] = [
    { title: 'Title', type: 'word', thumbnail: 'assets/word-doc-thumbnail.jpg' },
    { title: 'Title', type: 'pdf', thumbnail: 'assets/pdf-doc-thumbnail.jpg' },
    { title: 'Title', type: 'image', thumbnail: 'assets/image-doc-thumbnail.jpg' },
    { title: 'Title', type: 'word', thumbnail: 'assets/word-doc-thumbnail.jpg' },
    { title: 'Title', type: 'pdf', thumbnail: 'assets/pdf-doc-thumbnail.jpg' },
    { title: 'Title', type: 'image', thumbnail: 'assets/image-doc-thumbnail.jpg' },
  ];

  ngOnInit(): void { }

  getDocumentIcon(type: string): string {
    switch (type) {
      case 'word':
        return 'assets/word-icon.png';
      case 'pdf':
        return 'assets/pdf-icon.png';
      case 'image':
        return 'assets/image-icon.png';
      default:
        return 'assets/default-icon.png';
    }
  }

    // popup for uploading document
    isPopupVisible: boolean = false;

  addDocument() {
    this.isPopupVisible = true;
  }

  closePopup() {
    this.isPopupVisible = false;
  }

  triggerFileInput() {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    } else {
      this.selectedFile = null; // Reset if no file is selected
    }
  }

}
