import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserAuthService } from '../../../services/user-auth.service';
import { PetinfoService, Pet } from '../../../services/petinfo.service';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-choose-pet',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  templateUrl: './choose-pet.component.html',
  styleUrls: ['./choose-pet.component.css']
})
export class ChoosePetComponent implements OnInit {
  profile: any;
  type: string = '';
  pets: Pet[] = [];
  selectionLimitReached: boolean = false;
  selectedPetIds: string[] = []; // Array to hold selected pet IDs

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private auth: UserAuthService,
    private petinfoService: PetinfoService
  ) {}

  async ngOnInit(): Promise<void> {
    // Subscribe to query parameters
    this.route.queryParams.subscribe(params => {
      this.type = params['value'] || '';
      console.log('Query Parameter Value:', this.type);
    });
    // Load the user profile and then fetch pets
    await this.loadProfile();
    await this.loadProducts();
  }

  async loadProfile(): Promise<void> {
    try {
      this.profile = await this.auth.getProfile();
      console.log('User Profile:', this.profile);
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  }

  async loadProducts(): Promise<void> {
    if (!this.profile || !this.profile.id) {
      console.error('Profile or profile.id is not available.');
      return;
    }
    try {
      // Fetch pets for the current pet owner using getPetsByOwnerId
      const response = await this.petinfoService.getPetsByOwnerId(this.profile.id);
      // Assuming the backend returns an object with a 'pets' array
      this.pets = response.data.pets;
      console.log('Fetched pets:', this.pets);
    } catch (error) {
      console.error('Error in loadProducts:', error);
    }
  }

  // This method is called when the user clicks "Continue" in the template.
  // We alias it to our next() method.
  onContinue(): void {
    console.log('onContinue triggered');
    this.next();
  }
  

  // src/app/user/sub-components/choose-pet/choose-pet.component.ts
next(): void {
  // Forward petIds along with package details from the current route's query parameters.
  this.router.navigate(['user-main-component/confirm-information'], { 
    queryParams: { 
      petIds: this.selectedPetIds, 
      pkgId: this.route.snapshot.queryParams['pkgId'],
      pkgName: this.route.snapshot.queryParams['pkgName'],
      pkgPrice: this.route.snapshot.queryParams['pkgPrice']
      
    } 
  });
}

  
  

  addPet(): void {
    this.router.navigate(['/user-main-component/create-pet-profile'], { queryParams: { back: true } });
  }

  editPet(id: number): void {
    this.router.navigate([`/user-main-component/pet/edit/${id}`], { queryParams: { back: true } });
  }

  onPetSelect(petId: string, isChecked: boolean): void {
    if (this.type === 'free') {
      // For free trial, allow only one selection
      if (isChecked) {
        this.selectedPetIds = [petId];
        this.selectionLimitReached = true;
      } else {
        this.selectedPetIds = [];
      }
    } else {
      // For other types, allow multiple selections
      if (isChecked) {
        this.selectedPetIds.push(petId);
      } else {
        this.selectedPetIds = this.selectedPetIds.filter(id => id !== petId);
      }
    }
    console.log('Selected Pet IDs:', this.selectedPetIds);
  }

  isCheckboxDisabled(petId: string): boolean {
    if (this.type === 'free' && this.selectedPetIds.length >= 1 && !this.selectedPetIds.includes(petId)) {
      return true;
    }
    return false;
  }
}
