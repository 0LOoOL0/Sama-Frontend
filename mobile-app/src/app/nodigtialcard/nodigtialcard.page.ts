import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nodigtialcard',
  templateUrl: './nodigtialcard.page.html',
  styleUrls: ['./nodigtialcard.page.scss'],
})
export class NodigtialcardPage implements OnInit {

  segment: string = 'qrCode';
  selectedPet: any;
  pets = [
    { name: 'Maxi', avatar: 'assets/pet-avatar.jpg' },
    // Add more pets as needed
  ];

  constructor() { }

  ngOnInit() {
    this.selectedPet = this.pets[0]; // Set default selected pet
  }
}