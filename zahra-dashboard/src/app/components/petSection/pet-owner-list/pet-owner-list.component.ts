import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PetOwner } from '../model/owner.model';
import { PetOwnerService } from '../service/petSection.service';

// interface ownerr {
//   id: number;
//   first_name: string;
//   last_name: string;
//   email: string;
//   nationality: string;
//   city?: string;
// }

@Component({
  selector: 'app-pet-owner-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pet-owner-list.component.html',
  styleUrl: './pet-owner-list.component.css'
})
export class PetOwnerListComponent implements OnInit {

  petOwner: PetOwner | null = null;
  loading: boolean = true;
  error: string | null = null;
  pets: any[] = [];
  petCount: number = 0;
  fromDate: string = '';
  toDate: string = '';
  petOwners: PetOwner[] = [];
  ownerData: any[] = [];
  filteredOwners: any[] = [];
  ownersCount: number = 0;
  owneridtest: number = 0;
  petOwnerId: any;
  selectedOwner: any = {};
  owners: any[] = [];

  constructor(
    private petOwnerService: PetOwnerService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.fetchPetOwners();
  
    if (this.petOwnerId) {
      this.loadPets(this.petOwnerId);
    } else {
      this.error = 'Owner ID not available';
    }
  }
  
  fetchPetOwners(): void {
    this.petOwnerService.getPetOwners().subscribe({
      next: (response) => {
        // console.log('API Response:', response);

        if (response && typeof response === 'object' && 'data' in response) {
          this.ownerData = Array.isArray(response.data) ? response.data : [];
          this.filteredOwners = [...this.ownerData];
          this.ownersCount = this.ownerData.length;
          // console.log("Assigned ownerData:", this.ownerData);
        } else {
          console.error("Unexpected API response format:", response);
          this.ownerData = [];
          this.filteredOwners = [];
        }
      },
      error: (error) => {
        console.error('API Fetch Error:', error);
      }
    });
  }

  filterByCity(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const city = inputElement.value.trim().toLowerCase();

    if (!this.ownerData || !Array.isArray(this.ownerData)) {
      return;
    }
  
    if (city) {
      this.filteredOwners = this.ownerData.filter(owner =>
        owner.city?.toLowerCase().includes(city)
      );
    } else {
      this.filteredOwners = [...this.ownerData];
    }
  }
  
  filterByName(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const name = inputElement.value.trim().toLowerCase();

    if (name) {
      this.filteredOwners = this.ownerData.filter(owner =>
        (owner.first_name && owner.first_name.toLowerCase().includes(name)) ||
        (owner.last_name && owner.last_name.toLowerCase().includes(name))
      );
    } else {
      this.filteredOwners = [...this.ownerData];
    }
  }

  showOwnerId(owner: any): void {
    // console.log("Clicked Owner ID:", owner.id);
    // this.toastr.info(`You clicked on Owner ID: ${owner.id}`);

    this.petOwnerId = owner.id;
    // console.log("Test", owner.id);

    this.petOwnerService.setOwnerId(this.petOwnerId);

    // console.log("Test2", this.petOwnerService.getOwnerId());
    this.router.navigate(['/owner-profile', owner.id]);

  }

  loadPets(ownerId: string): void {
    const petOwnerId = +ownerId;
  
    if (!petOwnerId) {
      this.error = 'Invalid Owner ID.';
      console.error(this.error);
      return;
    }
  
    // console.log('Fetching pets for Owner ID:', petOwnerId);
    this.loading = true;
  
    this.petOwnerService.getPetsByOwnerId(petOwnerId).subscribe({
      next: (data) => {
        // console.log('Fetched Pets:', data);
  
        if (data && Array.isArray(data.pets) && data.pets.length > 0) {
          this.pets = data.pets;
          this.petCount = this.pets.length;
          // console.log('Number of pets for this owner:', this.petCount);
        } else {
          this.error = 'No pets found for this owner.';
          // console.log('No pets found for Owner ID:', petOwnerId);
        }
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error fetching pets.';
        this.loading = false;
        console.error('Error fetching pets:', err);
      },
    });
  }

  filterByDateRange() {
    const fromDateInput = document.getElementById('from-date') as HTMLInputElement;
    const toDateInput = document.getElementById('to-date') as HTMLInputElement;
  
    this.fromDate = fromDateInput?.value.trim() || '';
    this.toDate = toDateInput?.value.trim() || '';
  
    if (this.fromDate && this.toDate) {
      const selectedFromDate = new Date(this.fromDate);
      const selectedToDate = new Date(this.toDate);
      selectedToDate.setHours(23, 59, 59, 999); // Include entire last day
  
      this.filteredOwners = this.ownerData.filter(owner => {
        const ownerStartDate = new Date(owner.start_date);
        const ownerEndDate = new Date(owner.end_date);
  
        return (
          (ownerStartDate >= selectedFromDate && ownerStartDate <= selectedToDate) ||
          (ownerEndDate >= selectedFromDate && ownerEndDate <= selectedToDate) ||
          (ownerStartDate <= selectedFromDate && ownerEndDate >= selectedToDate)
        );
      });
    } else {
      this.filteredOwners = [...this.ownerData]; // Reset if no selection
    }
  }
}