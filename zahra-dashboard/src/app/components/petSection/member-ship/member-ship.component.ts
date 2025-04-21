import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Pet } from '../model/pet.model';  
import { PetOwnerService } from '../service/petSection.service';
// import { PetOwner } from '../petSection/model/pet.model';

@Component({
  selector: 'app-member-ship',
  imports: [CommonModule],
  templateUrl: './member-ship.component.html',
  styleUrl: './member-ship.component.css'
})
export class MemberShipComponent {

    // pets: PetOwner[] = [];
    petsData: any[] = [];
    filteredPets: any[] = [];
    petsCount: number = 0;
  route: any;
  petOwnerId: number | undefined;

      constructor(private petOwnerService: PetOwnerService,
      ) { }
    
      ngOnInit(): void {

        this.fetchPets();
        // this.route.params.subscribe((params: { [x: string]: string | number; }) => {
        //   this.petOwnerId = +params['pet_owner_id']; // Convert to number
        //   if (this.petOwnerId) {
        //     this.fetchPetsOwner(this.petOwnerId);  // Call the fetchPets method with pet_owner_id
        //   }
        // });      
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
  // fetchPetsOwner(petOwnerId: number): void {
  //   this.petOwnerService.getPetsByOwnerId(petOwnerId).subscribe({
  //     next: (response) => {
  //       console.log('✅ API Response:', response);

  //       if (response && typeof response === 'object' && 'data' in response) {
  //         this.petsData = Array.isArray(response.data) ? response.data : [];
  //         this.filteredPets = [...this.petsData];
  //         this.petsCount = this.petsData.length;
  //         console.log('✅ Assigned petData:', this.petsData);
  //       } else {
  //         console.error('❌ Unexpected API response format:', response);
  //         this.petsData = [];
  //         this.filteredPets = [];
  //       }
  //     },
  //     error: (error) => {
  //       console.error('❌ API Fetch Error:', error);
  //       this.petsData = [];
  //       this.filteredPets = [];
  //     }
  //   });
  // }
}
