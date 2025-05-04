import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PetSectionService } from '../../petSection/service/PetSectionServices';

interface Pet {
  image?: string;
  name: string;
  dateMate?: string;
  pet_type?: string;
  created_at?: string;
  is_neutered?: number; // assuming 1 means neutered
}

@Component({
  selector: 'app-mating',
  templateUrl: './mating.component.html',
  standalone: true,
  imports: [CommonModule],
  styleUrls: ['./mating.component.css']
})
export class MatingComponent implements OnInit {
  pets: Pet[] = [];
  showMore: boolean = false;

  constructor(private petSectionService: PetSectionService) {}

  ngOnInit(): void {
    this.fetchMatingPets();
  }

  fetchMatingPets(): void {
    this.petSectionService.getPetsForMating().subscribe(
      (data: any[]) => {
        // Filter to only include pets where is_neutered === 1.
        this.pets = data.filter(pet => pet.is_neutered == 1).map(pet => ({
          ...pet,
          dateMate: pet.dateMate || pet.created_at || '-'
        }));
      },
      (error) => {
        console.error('Error fetching mating pets:', error);
      }
    );
  }

  get displayedPets(): Pet[] {
    return this.showMore ? this.pets : this.pets.slice(0, 6);
  }

  togglePets(): void {
    this.showMore = !this.showMore;
  }
}
