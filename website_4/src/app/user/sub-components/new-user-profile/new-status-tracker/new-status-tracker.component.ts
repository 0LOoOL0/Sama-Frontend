import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PetinfoService, Pet } from '../../../../services/petinfo.service';
import { PetSelectionService } from '../../../../services/PetSelectionService';

@Component({
  selector: 'app-new-status-tracker',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container">
      <ul class="search">
        <li>
          <input type="text" placeholder="Search" />
          <button>Search</button>
        </li>
      </ul>
      <!-- Navigation filters -->
      <div class="nav">
        <ul class="tabs">
          <li
            class="tab-item"
            *ngFor="let tab of tabs"
            (click)="selectTab(tab)"
            [class.active]="activeTab === tab"
          >
            <span>{{ tab }}</span>
          </li>
        </ul>
      </div>
      <!-- Displaying items -->
      <div class="items">
        <ul class="detail" *ngFor="let item of filteredItems">
          <li class="status">{{ activeTab }}</li>
          <li>
            <img [src]="item.image" alt="{{ item.name }}" />
          </li>
          <li>
            <h3>{{ item.name }}</h3>
          </li>
          <li>
            <button>
              {{ activeTab === 'Selling' ? 'For Sale' : 'Available' }}
            </button>
            <button class="delete">Delete</button>
          </li>
        </ul>
      </div>
    </div>
  `,
  styleUrls: ['./new-status-tracker.component.scss']
})
export class NewStatusTrackerComponent implements OnInit {
  tabs: string[] = ['Adoption', 'Lost Pet', 'Mating', 'Selling'];
  activeTab: string = this.tabs[0];
  // Object to store filtered items by category
  items: { [key: string]: Pet[] } = {
    Adoption: [],
    'Lost Pet': [],
    Mating: [],
    Selling: []
  };
  filteredItems: Pet[] = [];
  petOwnerId = 1; // Replace with dynamic value as needed

  constructor(private petService: PetinfoService,
    private petSelectionService: PetSelectionService) {}

  
    ngOnInit(): void {
      this.petSelectionService.selectedPet$.subscribe(pet => {
        if (pet && pet.pet_owner_id) {
          this.loadStatusByOwner(pet.pet_owner_id);
        }
      });
    }
    
  

  selectTab(tab: string): void {
    this.activeTab = tab;
    this.filteredItems = this.items[tab];
  }

  loadStatusByOwner(ownerId: number): void {
    this.petService
      .getPetsByOwnerId(ownerId)
      .then((res: { data: { pets: Pet[] } }) => {
        const ownerPets = res.data.pets;
  
        this.items = {
          Adoption: ownerPets.filter(pet => pet.allow_adoption === 1),
          'Lost Pet': ownerPets.filter(pet => pet.is_lost === 1),
          Mating: ownerPets.filter(pet => pet.is_neutered === 1),
          Selling: ownerPets.filter(pet => pet.allow_selling === 1)
        };
        
  
        this.filteredItems = this.items[this.activeTab];
      })
      .catch(error => {
        console.error('Error fetching pets by owner:', error);
      });
  }
  
}
