import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
@Component({
  selector: 'app-mate-listing',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './mate-listing.component.html',
  styleUrl: './mate-listing.component.css'
})
export class MateListingComponent implements OnInit {
  pets = [
    { id: 1, name: 'Cat 1', type: 'Cat', gender: 'Male', age: 2, distance: 10, description: 'Friendly and playful.' },
    { id: 2, name: 'Dog 1', type: 'Dog', gender: 'Female', age: 4, distance: 15, description: 'Loyal and loving.' },
    { id: 3, name: 'Rabbit 1', type: 'Rabbit', gender: 'Male', age: 1, distance: 5, description: 'Soft and cuddly.' },
    // Add more pet objects as needed
  ];
  filteredPets = [...this.pets]; // Initialize with all pets
  searchTerm: string = '';
  selectedTypes: string[] = [];
  selectedGender: string | null = null;
  ageRange: number = 12;
  distanceRange: number = 50;
  petTypes: string[] = ['Cat', 'Dog', 'Rabbit', 'Bird', 'Fish']; // Available types

  constructor() {}

  ngOnInit(): void {}

  filterPets() {
    this.filteredPets = this.pets.filter((pet) => {
      const matchesSearchTerm = this.searchTerm
        ? pet.name.toLowerCase().includes(this.searchTerm.toLowerCase())
        : true;

      const matchesType =
        this.selectedTypes.length > 0
          ? this.selectedTypes.includes(pet.type)
          : true;

      const matchesGender = this.selectedGender
        ? pet.gender === this.selectedGender
        : true;

      const matchesAge = pet.age <= this.ageRange;

      const matchesDistance = pet.distance <= this.distanceRange;

      return (
        matchesSearchTerm &&
        matchesType &&
        matchesGender &&
        matchesAge &&
        matchesDistance
      );
    });
  }

  onTypeFilterChange(type: string, isChecked: boolean) {
    if (isChecked) {
      this.selectedTypes.push(type);
    } else {
      const index = this.selectedTypes.indexOf(type);
      if (index > -1) {
        this.selectedTypes.splice(index, 1);
      }
    }
    this.filterPets();
  }

  onGenderFilterChange(gender: string) {
    this.selectedGender = gender;
    this.filterPets();
  }

}
