import { Component,OnInit } from '@angular/core';
import { PetinfoService, Pet } from '../../../../../services/petinfo.service';
import { UserAuthService } from '../../../../../services/user-auth.service';
import { RouterModule, Routes } from '@angular/router';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-new-pet-info',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './new-pet-info.component.html',
  styleUrl: './new-pet-info.component.css'
})
export class NewPetInfoComponent implements OnInit {

  pets: Pet[] = [];
  selectedPet: Pet | null = null;
  userProfile: any;

  constructor(
      private router: Router,
      private userAuthService: UserAuthService,
      private petInfoService: PetinfoService
    ) { }

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

    isAdoptionPopupVisible: boolean = false;
    isSellPopupVisible: boolean = false;
    isMatePopupVisible: boolean = false;
    isLostPopupVisible: boolean = false;

    openAdoptionPopup() {
      this.isAdoptionPopupVisible = true;
    }
    openSellPopup() {
      this.isSellPopupVisible = true;
    }
    openMatePopup() {
      this.isMatePopupVisible = true;
    }
    openLostPopup() {
      this.isLostPopupVisible = true;
    }
  
    closePopup() {
      this.isAdoptionPopupVisible = false;
      this.isSellPopupVisible = false;
      this.isMatePopupVisible = false;
      this.isLostPopupVisible = false;
    }

}
