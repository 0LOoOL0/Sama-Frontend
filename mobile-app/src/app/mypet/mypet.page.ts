import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { PetInfoService } from '../services/pet-info.service';
@Component({
  selector: 'app-mypet',
  templateUrl: './mypet.page.html',
  styleUrls: ['./mypet.page.scss'],
})
export class MypetPage implements OnInit {
  pets: any[] = [];
  constructor(
    private authService: AuthService,
    private router: Router,
    private petService: PetInfoService,
  ) {}

  ngOnInit() {
    this.petService.fetchPets().then(async (Response: any) => {
      this.pets = Response;
      await this.loadImages();
    });
  }

  goProfileDetails(id: number) {
    this.petService.setPetId(id);
    this.router.navigate(['/petdetailes', id]);
  }
  addNewPet() {
    this.router.navigate(['/pet-profile']);
  }

  async loadImages() {
    for (let pet of this.pets) {
      if (pet.image) {
        pet.imageUrl = await this.petService.uploadImage(pet.image);
      }
    }
    console.log('the Image URL  for all pets: ============>', this.pets);
  }
}
