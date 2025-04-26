import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PetInfoService } from '../services/pet-info.service';

@Component({
  selector: 'app-my-pets',
  templateUrl: './my-pets.page.html',
  styleUrls: ['./my-pets.page.scss'],
})
export class MyPetsPage implements OnInit {
  constructor(private petService: PetInfoService, private router: Router) {}
  myPets: any;
  ngOnInit() {
    this.petService.fetchPets().then(async (response: any) => {
      this.myPets = response;
      await this.loadImages();
    });
  }

  async loadImages() {
    for (let pet of this.myPets) {
      if (pet.image) {
        pet.imageUrl = await this.petService.uploadImage(pet.image);
      }
    }
  }
  edit(id: any) {
    this.router.navigate(['/petdetailes', id]);
  }
}
