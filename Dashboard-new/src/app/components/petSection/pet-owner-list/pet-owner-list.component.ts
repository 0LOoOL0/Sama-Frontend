import { Component, OnInit } from '@angular/core'; 
import { CommonModule } from '@angular/common';
import { PetHeaderComponent } from '../pet-header/pet-header.component';
import { PetSectionService } from '../service/PetSectionServices';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-pet-owner-list',
  standalone: true,
  imports: [CommonModule/*, PetHeaderComponent*/, RouterLink],
  templateUrl: './pet-owner-list.component.html',
  styleUrls: ['./pet-owner-list.component.css']
})
export class PetOwnerListComponent implements OnInit {
  owners: any[] = [];
  filteredOwners: any[] = [];
  membershipCounts: { [ownerId: number]: number } = {};
  searchText: string = '';

  constructor(private petSectionService: PetSectionService, private router: Router) { }

  ngOnInit(): void {
    this.loadOwners();
  }

  loadOwners(): void {
    this.petSectionService.getOwners().subscribe(
      (response: any) => {
        console.log('Owners loaded:', response);
        if (response && response.data && Array.isArray(response.data)) {
          this.owners = response.data;
          this.filteredOwners = [...this.owners];  // Initialize filteredOwners with all owners
        } else if (Array.isArray(response)) {
          this.owners = response;
          this.filteredOwners = [...this.owners];  // Initialize filteredOwners with all owners
        } else {
          this.owners = [];
          this.filteredOwners = [];
        }

        this.owners.forEach(owner => {
          this.countMem(owner.id);
        });
      },
      (error: any) => {
        console.error('Error loading owners:', error);
      }
    );
  }

  countMem(ownerId: number): void {
    this.petSectionService.getPetsWithMembershipByOwner(ownerId).subscribe(
      (data: any[]) => {
        const count = data.filter(pet => pet.membership && pet.membership.package).length;
        this.membershipCounts[ownerId] = count;
        console.log(`Owner ${ownerId} has ${count} pets with memberships.`);
      },
      (error: any) => {
        console.error(`Error counting memberships for owner ${ownerId}:`, error);
        this.membershipCounts[ownerId] = 0;
      }
    );
  }

  editOwner(owner: any): void {
    this.petSectionService.setOwnerId(owner.id);
    this.router.navigate(['/owner-profile', owner.id], { state: { ownerData: owner } });
  }

  filterByOwner(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const name = inputElement.value.trim().toLowerCase();  // Capture the input value and make it case-insensitive
  
    console.log("Filtering by owner:", name);
    console.log("Available owners:", this.owners);
  
    if (!this.owners || !Array.isArray(this.owners)) {
      console.error("owners is undefined or not an array");
      return;
    }
  
    // Apply the filter based on matching any of the name fields
    if (name) {
      this.filteredOwners = this.owners.filter(owner =>
        owner.ownerName?.toLowerCase().includes(name)
      );
    } else {
      // If the input is empty, reset to show all owners
      this.filteredOwners = [...this.owners];  // Reset to all owners
    }
  
    console.log("Filtered owners:", this.filteredOwners);
  }
  filterByDateRange(): void {
    const fromDateInput = document.getElementById('from-date') as HTMLInputElement;
    const toDateInput = document.getElementById('to-date') as HTMLInputElement;
  
    const fromDate = fromDateInput?.value;
    const toDate = toDateInput?.value;
  
    if (fromDate && toDate) {
      const selectedFromDate = new Date(fromDate);
      const selectedToDate = new Date(toDate);
      selectedToDate.setHours(23, 59, 59, 999);
  
      console.log("Date range:", selectedFromDate, selectedToDate);
  
      this.filteredOwners = this.owners.filter(owner => {
        const startDate = new Date(owner.startDate); // <-- updated from created_at to startDate
        if (isNaN(startDate.getTime())) {
          console.warn('Invalid date:', owner.startDate);
          return false;
        }
        return startDate >= selectedFromDate && startDate <= selectedToDate;
      });
    } else {
      this.filteredOwners = [...this.owners];
    }
  
    console.log("Filtered owners after date range:", this.filteredOwners);
  }
  
  // filterByDateRange(): void {
  //   const fromDateInput = document.getElementById('from-date') as HTMLInputElement;
  //   const toDateInput = document.getElementById('to-date') as HTMLInputElement;
  
  //   const fromDate = fromDateInput?.value;
  //   const toDate = toDateInput?.value;
  
  //   if (fromDate && toDate) {
  //     const selectedFromDate = new Date(fromDate);
  //     const selectedToDate = new Date(toDate);
  //     selectedToDate.setHours(23, 59, 59, 999);
  
  //     console.log("Date range:", selectedFromDate, selectedToDate);
  
  //     this.filteredOwners = this.owners.filter(owner => {
  //       const createdAt = new Date(owner.created_at);
  //       if (isNaN(createdAt.getTime())) {
  //         console.warn('Invalid date:', owner.created_at);
  //         return false;
  //       }
  //       return createdAt >= selectedFromDate && createdAt <= selectedToDate;
  //     });
  //   } else {
  //     this.filteredOwners = [...this.owners];
  //   }
  // }
  
  // filterByDateRange(): void {
  //   const fromDateInput = document.getElementById('from-date') as HTMLInputElement;
  //   const toDateInput = document.getElementById('to-date') as HTMLInputElement;
  
  //   const fromDate = fromDateInput?.value;
  //   const toDate = toDateInput?.value;
  
  //   if (fromDate && toDate) {
  //     const selectedFromDate = new Date(fromDate);
  //     const selectedToDate = new Date(toDate);
  
  //     // Extend selectedToDate to the end of the day
  //     selectedToDate.setHours(23, 59, 59, 999);
  
  //     this.filteredOwners = this.owners.filter(owner => {
  //       const createdAt = new Date(owner.created_at);
  //       return createdAt >= selectedFromDate && createdAt <= selectedToDate;
  //     });
  //   } else {
  //     // If no date selected, show all
  //     this.filteredOwners = [...this.owners];
  //   }
  // }
  
}
// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { PetHeaderComponent } from '../pet-header/pet-header.component';
// import { PetSectionService } from '../service/PetSectionServices';
// import { Router, RouterLink } from '@angular/router';
// // import { FormsModule } from '@angular/forms';

// @Component({
//   selector: 'app-pet-owner-list',
//   standalone: true,
//   imports: [CommonModule, PetHeaderComponent, RouterLink /*, FormsModule*/],
//   templateUrl: './pet-owner-list.component.html',
//   styleUrls: ['./pet-owner-list.component.css']
// })
// export class PetOwnerListComponent implements OnInit {
//   owners: any[] = [];
//   membershipCounts: { [ownerId: number]: number } = {};
//   searchText: string = '';

//   constructor(private petSectionService: PetSectionService, private router: Router) { }

//   ngOnInit(): void {
//     this.loadOwners();
//   }

//   loadOwners(): void {
//     this.petSectionService.getOwners().subscribe(
//       (response: any) => {
//         console.log('Owners loaded:', response);
//         if (response && response.data && Array.isArray(response.data)) {
//           this.owners = response.data;
//         } else if (Array.isArray(response)) {
//           this.owners = response;
//         } else {
//           this.owners = [];
//         }

//         this.owners.forEach(owner => {
//           this.countMem(owner.id);
//         });
//       },
//       (error: any) => {
//         console.error('Error loading owners:', error);
//       }
//     );

//   }

//   countMem(ownerId: number): void {
//     this.petSectionService.getPetsWithMembershipByOwner(ownerId).subscribe(
//       (data: any[]) => {
//         const count = data.filter(pet => pet.membership && pet.membership.package).length;
//         this.membershipCounts[ownerId] = count;
//         console.log(`Owner ${ownerId} has ${count} pets with memberships.`);
//       },
//       (error: any) => {
//         console.error(`Error counting memberships for owner ${ownerId}:`, error);
//         this.membershipCounts[ownerId] = 0;
//       }
//     );
//   }

//   editOwner(owner: any): void {
//     this.petSectionService.setOwnerId(owner.id);
//     this.router.navigate(['/owner-profile', owner.id], { state: { ownerData: owner } });
//   }

//   filterByOwner(event: Event): void {
//     const inputElement = event.target as HTMLInputElement;
//     const name = inputElement.value.trim().toLowerCase();  // Capture the input value and make it case-insensitive
  
//     console.log("Filtering by owner:", name);  // Debugging log
//     console.log("Available owners:", this.owners);  // Debugging log
  
//     if (!this.owners || !Array.isArray(this.owners)) {
//       console.error("owners is undefined or not an array");
//       return;
//     }
  
//     // Apply the filter based on matching any of the name fields (case-insensitive)
//     if (name) {
//       this.owners = this.owners.filter(owner =>
//         owner.name?.toLowerCase().includes(name)
//       );
//     } else {
//       // If the input is empty, reset to show all owners
//       this.loadOwners();  // This will reload the owners' data
//     }
  
//     console.log("Filtered owners:", this.owners);  // Debugging log
//   }
// }
//   // get filteredOwners(): any[] {
//   //   if (!this.searchText) {
//   //     return this.owners;
//   //   }

//   //   const text = this.searchText.toLowerCase();

//   //   return this.owners.filter(owner =>
//   //     (owner.name?.toLowerCase().includes(text))
//   //   );
//   // }
