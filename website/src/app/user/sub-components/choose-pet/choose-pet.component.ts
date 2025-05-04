import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserAuthService } from '../../../services/user-auth.service';
import { PetinfoService } from '../../../services/petinfo.service';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
@Component({
  selector: 'app-choose-pet',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  templateUrl: './choose-pet.component.html',
  styleUrl: './choose-pet.component.css'
})
export class ChoosePetComponent {
  profile:any;
  type: string = '';
  provider_id:any;
  pets:any;
  selectionLimitReached: boolean = false;
  selectedPetIds: string[] = []; // Array to hold selected pet IDs
  constructor(private router: Router, private route: ActivatedRoute, private auth: UserAuthService,
    private pts: PetinfoService
  ){}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.type = params['value']; // Access the 'value' query parameter
      console.log('Query Parameter Value:', this.type);
    });
    this.logge();
    this.loadProducts();


  }
  async loadProducts() {
    try {
      const response = await this.pts.getPets();
      // this.pets = response.data.data;
      console.log('pets :', this.pets);
    } catch (error) {
      console.error('Error in loadProducts:', error);
    }
  }
  async logge(){
    const profile = await this.auth.getProfile();
    console.log(profile);
  }

  next(){
    if(this.type === 'choose'){
      // Navigate to the next page with selected pet IDs as query parameters
      this.router.navigate(['user-main-component/confirm-information'], { queryParams: { petIds: this.selectedPetIds } });
    }else if(this.type = 'free'){//somewhere else
      this.router.navigate(['user-main-component/confirm-information'], { queryParams: { petIds: this.selectedPetIds, sub: this.type } });
    }
  }

  addPet(){
    this.router.navigate(['/user-main-component/create-pet-profile'], { queryParams: { back: true } });
  }
  editPet(id: number){
    this.router.navigate([`/user-main-component/pet/edit/${id}`], { queryParams: { back: true } });
  }

  onPetSelect(petId: string, isChecked: boolean) {
    if (this.type === 'free') {
      // If the type is 'free', allow only one selection
      if (isChecked) {
        this.selectedPetIds = [petId]; // Reset to the newly selected pet ID
        this.selectionLimitReached = true;
      } else {
        this.selectedPetIds = []; // Clear selection if unchecked
      }
    } else {
      // For other types, allow multiple selections
      if (isChecked) {
        this.selectedPetIds.push(petId); // Add the pet ID if checked
      } else {
        this.selectedPetIds = this.selectedPetIds.filter(id => id !== petId); // Remove the pet ID if unchecked
      }
    }
    console.log('Selected Pet IDs:', this.selectedPetIds);
  }

  isCheckboxDisabled(petId: string): boolean {
    if (this.type === 'free' && this.selectedPetIds.length >= 1 && !this.selectedPetIds.includes(petId)) {
      return true; // Disable checkbox if maximum selections reached and this pet is not selected
    }
    return false; // Enable checkbox otherwise
  }

  // this method is for two pet selection when freehhyuj
  // onPetSelect(petId: string, isChecked: boolean) {
  //   if (this.type === 'free') {
  //     if (isChecked) {
  //       // Only add the pet if we have less than two selected
  //       if (this.selectedPetIds.length < 2) {
  //         this.selectedPetIds.push(petId);
  //       } else {
  //         console.warn('Maximum of two pets can be selected.');
  //       }
  //     } else {
  //       // Remove the pet ID if unchecked
  //       this.selectedPetIds = this.selectedPetIds.filter(id => id !== petId);
  //     }
  //   } else {
  //     // For other types, allow multiple selections
  //     if (isChecked) {
  //       this.selectedPetIds.push(petId); // Add the pet ID if checked
  //     } else {
  //       this.selectedPetIds = this.selectedPetIds.filter(id => id !== petId); // Remove the pet ID if unchecked
  //     }
  //   }
  //   console.log('Selected Pet IDs:', this.selectedPetIds);
  // }
}
