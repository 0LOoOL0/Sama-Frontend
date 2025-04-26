import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CollarService } from '../../../services/collar.service';
import { UserAuthService } from '../../../services/user-auth.service';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-lost-pet-info',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  templateUrl: './lost-pet-info.component.html',
  styleUrls: ['./lost-pet-info.component.css']
})
export class LostPetInfoComponent implements OnInit {
  pet: any; // Pet data
  code: any; // Code from the URL
  profile: any; // Pet owner profile data
  isLoading: boolean = true; // Loading state

  constructor(
    private route: ActivatedRoute,
    private collarService: CollarService,
    private auth: UserAuthService
  ) {}

  async ngOnInit(): Promise<void> {
    this.isLoading = true; // Start loading

    try {
      await this.loadPetInfo(); // Wait for pet info to load
      await this.loadProfile();  // Wait for profile info to load
    } catch (error) {
      console.error('Error during initialization:', error);
    } finally {
      this.isLoading = false; // End loading after both data loads
    }
  }

  // Load pet profile data
  async loadProfile(): Promise<void> {
    if (this.pet) { // Ensure pet data is available before loading the profile
      try {
        this.profile = await this.auth.fetchPetOwnerData(this.pet.pet_owner_id);
        console.log('Profile Data:', this.profile);
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    } else {
      console.error('Pet data is not loaded yet.');
    }
  }

  // Load pet data based on the 'code' from the route
  async loadPetInfo(): Promise<void> {
    this.route.params.subscribe(async params => {
      this.code = params['code']; // Retrieve 'code' from the route parameter

      if (this.code) {
        try {
          this.pet = await this.collarService.getPetByCode(this.code); // Fetch pet info by code
          console.log('Pet Info:', this.pet);
        } catch (error) {
          console.error('Error fetching pet information:', error);
        }
      } else {
        console.error('No code provided in the route.');
      }
    });
  }
}
