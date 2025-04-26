import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PetinfoService, Pet } from '../../../../services/petinfo.service';
import { UserAuthService } from '../../../../services/user-auth.service';
import { RouterModule } from '@angular/router';
import { PetSelectionService } from '../../../../services/PetSelectionService';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-new-my-pets',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './new-my-pets.component.html',
  styleUrl: './new-my-pets.component.css'
})
export class NewMyPetsComponent implements OnInit {
  pets: Pet[] = [];
  selectedPet: Pet | null = null;
  userProfile: any;
  activeTab: string = 'info';

  transferEmail: string = '';
isPopupVisible: boolean = false;
emailToTransfer: string = '';
transferError: string = '';



  constructor(
    private router: Router,
    private userAuthService: UserAuthService,
    private petInfoService: PetinfoService,
    private petSelectionService: PetSelectionService,
    private sanitizer: DomSanitizer
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
      if (!this.userProfile) {
        await this.loadUserProfile();
      }
      const ownerId = this.userProfile.id;
      const petsResponse = await this.petInfoService.getPetsByOwnerId(ownerId);
      // Assuming your API returns pets in response.data.pets
      this.pets = petsResponse.data.pets;
      this.selectedPet = this.pets.length > 0 ? this.pets[0] : null;
      // Set the initially selected pet in the shared service
      this.petSelectionService.setSelectedPet(this.selectedPet);
    } catch (error) {
      console.error('Error loading pets:', error);
    }
  }

  displaySelected(i: number) {
    this.selectedPet = this.pets[i];
    console.log('Selected Pet:', this.selectedPet);
    // Update the shared selected pet so the child component updates
    this.petSelectionService.setSelectedPet(this.selectedPet);
  }

  sanitizeUrl(url: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  async isMember(id: number): Promise<boolean> {
    try {
      const resp = await this.petInfoService.getPetMembership(id);
      const endDate = new Date((resp.data as { end_date: string }).end_date);
      const currentDate = new Date();
      return endDate > currentDate;
    } catch (error) {
      console.error('Error checking membership:', error);
      return false;
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

  addPet() { 
    this.router.navigate(['/user-main-component/create-pet-profile']);
  }

  edit(id: number) { 
    this.router.navigate([`/user-main-component/pet/edit/${id}`]);
  }


  openPopup() {
    this.isPopupVisible = true;
  }

  closePopup() {
    this.isPopupVisible = false;
  }

  async transferPet() {
    console.log('[TRANSFER] Starting transferPet()');
    console.log('[TRANSFER] Email:', this.emailToTransfer);
    console.log('[TRANSFER] Selected Pet:', this.selectedPet);
  
    if (!this.emailToTransfer || !this.selectedPet) {
      console.warn('[TRANSFER] Email or selected pet missing');
      this.transferError = "Please enter an email and select a pet.";
      return;
    }
  
    try {
      const response = await this.petInfoService.getOwnerIdByEmail(this.emailToTransfer).toPromise();
      console.log('[TRANSFER] Raw response from getOwnerIdByEmail:', response);
  
      const newOwnerId = (response as any)?.ownerId;
  
      if (!newOwnerId) {
        console.error('[TRANSFER] No owner ID found in response:', response);
        this.transferError = "Owner ID not found.";
        return;
      }
  
      console.log('[TRANSFER] Updating pet', this.selectedPet.id, 'to owner', newOwnerId);
      await this.petInfoService.updatePetOwner(this.selectedPet.id, newOwnerId).toPromise();
  
      alert("Pet transferred successfully!");
      this.closePopup();
      this.loadPets();
    } catch (error: any) {
      console.error('[TRANSFER] Transfer failed:', error);
      this.transferError = error?.error?.message || "Something went wrong.";
    }
  }
  
  
  
  
  
  
}
