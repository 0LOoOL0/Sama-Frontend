import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PetinfoService } from '../../../../services/petinfo.service';
import { UserAuthService } from '../../../../services/user-auth.service';
import { RouterModule, ActivatedRoute  } from '@angular/router';

interface Pet {
  name: string;
  image: string;
  isVip: boolean;
  type: string;
  breed: string;
  age: string;
  gender: string;
  vaccinated: boolean;
  microchipped: boolean;
  neutered: boolean;
  weight: number;
  height: number;
}
interface HealthConcern {
  type: string;
  description: string;
}


@Component({
  selector: 'app-new-my-pets',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './new-my-pets.component.html',
  styleUrl: './new-my-pets.component.css'
})




export class NewMyPetsComponent implements OnInit {

  isPopupVisible: boolean = false;

  openPopup() {
    this.isPopupVisible = true;
  }

  closePopup() {
    this.isPopupVisible = false;
  }

  pets: Pet[] = [//this should take in the pets from the database, same as pet info page
    {
      name: 'Jiffy',
      image: 'assets/mochi.jpg',
      isVip: true,
      type: 'Dog',
      breed: 'Tabby',
      age: '2 years',
      gender: 'Female',
      vaccinated: true,
      microchipped: true,
      neutered: true,
      weight: 12,
      height: 30
    },
    {
      name: 'Mochi',
      image: 'assets/mochi.jpg',
      isVip: true,
      type: 'Dog',
      breed: 'Tabby',
      age: '2 years',
      gender: 'Female',
      vaccinated: true,
      microchipped: true,
      neutered: true,
      weight: 12,
      height: 30
    }, {
      name: 'captain',
      image: 'assets/mochi.jpg',
      isVip: true,
      type: 'Dog',
      breed: 'Tabby',
      age: '2 years',
      gender: 'Female',
      vaccinated: true,
      microchipped: true,
      neutered: true,
      weight: 12,
      height: 30
    }, {
      name: 'lucy',
      image: 'assets/mochi.jpg',
      isVip: true,
      type: 'Dog',
      breed: 'Tabby',
      age: '2 years',
      gender: 'Female',
      vaccinated: true,
      microchipped: true,
      neutered: true,
      weight: 12,
      height: 30
    }, {
      name: 'Jiffy',
      image: 'assets/mochi.jpg',
      isVip: true,
      type: 'Dog',
      breed: 'Tabby',
      age: '2 years',
      gender: 'Female',
      vaccinated: true,
      microchipped: true,
      neutered: true,
      weight: 12,
      height: 30
    }, 
  ];
  selectedPet: Pet | null = null;
  userProfile: any;

  activeTab: string = 'info';
 
  constructor(
    private router: Router,
    private userAuthService: UserAuthService,
    private petInfoService: PetinfoService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadUserProfile();
    this.loadPets();
    this.route.url.subscribe(() => {
      // Get the current route path
      const currentPath = this.router.url.split('/').pop();
      this.activeTab = currentPath === 'info' || currentPath === 'health' || currentPath === 'document' ? currentPath : 'info';
    });
  }

  async loadUserProfile() {
    try {
      this.userProfile = await this.userAuthService.fetchProfileData();
    } catch (error) {
      console.error('Error loading user profile:', error);
    }
  }

  async loadPets() {
    try {
      const petsResponse = await this.petInfoService.getPets();
      // this.pets = petsResponse.data.data as Pet[]; // Ensure TypeScript understands the type
      this.selectedPet = this.pets.length > 0 ? this.pets[0] : null; // Set the first pet as selected if available
    } catch (error) {
      console.error('Error loading pets:', error);
    }
  }

  displaySelected(i: number) {
    this.selectedPet = this.pets[i];
    console.log('sPet', this.selectedPet);
  }

  async isMember(id: number): Promise<boolean> {
    try {
      const resp = await this.petInfoService.getPetMembership(id);

      // Assuming resp has the structure you provided
      const endDate = new Date((resp.data as { end_date: string }).end_date); // Convert end_date to a Date object
      const currentDate = new Date(); // Get the current date

      // Check if the end date has not passed
      return endDate > currentDate;
    } catch (error) {
      console.error('Error checking membership:', error);
      return false; // Optionally return false in case of an error
    }
  }

  navigateToInfo() {
    this.activeTab = 'info';
    this.router.navigate(['/user-main-component/new-user-profile/new-my-pets/new-pet-info']);
  }

  navigateToHealth() {
    this.activeTab = 'health';
    this.router.navigate(['/user-main-component/new-user-profile/new-my-pets/new-health-concern']);
  }

  navigateToDocument() {
    this.activeTab = 'document';
    this.router.navigate(['/user-main-component/new-user-profile/new-my-pets/new-pet-documents']);
  }

  addPet() { this.router.navigate(['/user-main-component/create-pet-profile']); }
  edit(id: number) { this.router.navigate([`/user-main-component/pet/edit/${id}`]); }
}
