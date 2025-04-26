import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
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
  selector: 'app-pet-document',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  templateUrl: './pet-document.component.html',
  styleUrls: ['./pet-document.component.css']
})
export class PetDocumentComponent implements OnInit {
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

  constructor(private router: Router) { }

  info(){this.router.navigate(['/user-main-component/pet-info']);}
  health(){this.router.navigate(['/user-main-component/pet-health-concern']);}
  document(){this.router.navigate(['/user-main-component/pet-document']);}
  addPet(){this.router.navigate(['/user-main-component/create-pet-profile']);}


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
}