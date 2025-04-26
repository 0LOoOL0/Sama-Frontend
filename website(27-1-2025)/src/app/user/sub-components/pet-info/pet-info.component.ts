import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { Router } from '@angular/router';
import { PetinfoService, Pet } from '../../../services/petinfo.service';
import { UserAuthService } from '../../../services/user-auth.service';

@Component({
  selector: 'app-pet-info',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  templateUrl: './pet-info.component.html',
  styleUrls: ['./pet-info.component.css']
})
export class PetInfoComponent implements OnInit {
  pets: Pet[] = [];
  selectedPet: Pet | null = null;
  userProfile: any;

  constructor(
    private router: Router,
    private userAuthService: UserAuthService,
    private petInfoService: PetinfoService
  ) {}

  ngOnInit(): void {
    this.loadUserProfile();
    this.loadPets();
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
      // First, make sure userProfile is loaded to access the owner's id
      if (!this.userProfile) {
        await this.loadUserProfile();
      }
      const ownerId = this.userProfile.id;
      // Use the new service method to fetch pets for the current owner
      const response = await this.petInfoService.getPetsByOwnerId(ownerId);
      // Assuming the response structure contains a 'pets' array as defined in your controller
      this.pets = response.data.pets;
      this.selectedPet = this.pets.length > 0 ? this.pets[0] : null;
    } catch (error) {
      console.error('Error loading pets:', error);
    }
  }
  
  

  displaySelected(i: number){
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


  info(){this.router.navigate(['/user-main-component/pet-info']);}
  health(){this.router.navigate(['/user-main-component/pet-health-concern']);}
  document(){this.router.navigate(['/user-main-component/pet-document']);}
  addPet(){this.router.navigate(['/user-main-component/create-pet-profile']);}
  edit(id: number){this.router.navigate([`/user-main-component/pet/edit/${id}`]);}
}