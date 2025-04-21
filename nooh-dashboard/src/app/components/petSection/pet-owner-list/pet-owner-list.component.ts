import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PetHeaderComponent } from '../pet-header/pet-header.component';
import { PetSectionService } from '../service/PetSectionServices';
import { Router, RouterLink } from '@angular/router';


@Component({
  selector: 'app-pet-owner-list',
  standalone: true,
  imports: [CommonModule, PetHeaderComponent, RouterLink],
  templateUrl: './pet-owner-list.component.html',
  styleUrls: ['./pet-owner-list.component.css']  // Create an empty file if you have no custom styles
})
export class PetOwnerListComponent implements OnInit {
  owners: any[] = [];

  constructor(private petSectionService: PetSectionService, private router: Router) {}

  ngOnInit(): void {
    this.loadOwners();
  }

  loadOwners(): void {
    this.petSectionService.getOwners().subscribe(
      (response: any) => {
        console.log('Owners loaded:', response);
        // If the API returns an object with a 'data' property that is an array:
        if (response && response.data && Array.isArray(response.data)) {
          this.owners = response.data;
        } 
        // Otherwise, if the response is directly an array:
        else if (Array.isArray(response)) {
          this.owners = response;
        } else {
          this.owners = [];
        }
      },
      (error: any) => {
        console.error('Error loading owners:', error);
      }
    );
  }

  editOwner(owner: any): void {
    this.petSectionService.setOwnerId(owner.id);
    this.router.navigate(['/owner-profile', owner.id], { state: { ownerData: owner } });

  }
  

  
}//
