import { Component, OnInit } from '@angular/core';
import { ProviderSectionService } from '../provider-section/service/provider-section.service';
import { ToastrService } from 'ngx-toastr';
import { PetOwner } from '../petSection/model/owner.model';
import { Pet } from '../petSection/model/pet.model';
import { PetOwnerService } from '../petSection/service/petSection.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-admin-dashboard',
  imports: [CommonModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})

export class AdminDashboardComponent implements OnInit {
  providerData: any[] = [];
  ownersData: any[] = [];
  filteredProviders: any[] = [];
  filteredOwner: any[] = [];
  providersCount: number = 0;
  ownersCount: number = 0;
  petOwners: PetOwner[] = [];
  ownerData: any[] = [];
  filteredOwners: any[] = [];
  pets: PetOwner[] = [];
  petsData: any[] = [];
  filteredPets: any[] = [];
  petsCount: number = 0;

  constructor(private providerService: ProviderSectionService,private petOwnerService: PetOwnerService,
  ) { }

  ngOnInit(): void {
    this.fetchProviderData();
    this.fetchPetOwners();
    this.fetchPets();
  }

  fetchProviderData(): void {
    this.providerService.getProvider().subscribe({
      next: (data: any) => {
        if (data) {
          this.providerData = data.providers || [];
          this.filteredProviders = [...this.providerData]; // Set filtered providers initially to all providers
          this.providersCount = this.filteredProviders.length; // Set the count
        }
      },
      error: (err) => {
        console.error("Error fetching provider data", err);
      }
    });
  }
  fetchPetOwners(): void {
    this.petOwnerService.getPetOwners().subscribe({
      next: (response) => {
        console.log('✅ API Response:', response);

        if (response && typeof response === 'object' && 'data' in response) {
          this.ownerData = Array.isArray(response.data) ? response.data : [];
          this.filteredOwners = [...this.ownerData];
          this.ownersCount = this.ownerData.length;
          console.log("✅ Assigned ownerData:", this.ownerData);
        } else {
          console.error("❌ Unexpected API response format:", response);
          this.ownerData = [];
          this.filteredOwners = [];
        }
      },
      error: (error) => {
        console.error('❌ API Fetch Error:', error);
      }
    });
  }
  fetchPets(): void {
    this.petOwnerService.getPets().subscribe({
      next: (response) => {
        console.log('✅ API Response:', response);
  
        // Check if the response has a 'data' property and is an array
        if (response && typeof response === 'object' && 'data' in response) {
          // Assuming the data is an array of pets
          this.petsData = Array.isArray(response.data) ? response.data : [];
          this.filteredPets = [...this.petsData]; // You can filter pets here if needed
          this.petsCount = this.petsData.length; // Count the number of pets
          console.log("✅ Assigned petData:", this.petsData);
        } else {
          console.error("❌ Unexpected API response format:", response);
          this.petsData = [];
          this.filteredPets = [];
        }
      },
      error: (error) => {
        console.error('❌ API Fetch Error:', error);
        this.petsData = [];
        this.filteredPets = [];
      }
    });
  }
  
}
