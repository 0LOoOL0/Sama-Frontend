import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PetSectionService } from '../../petSection/service/PetSectionServices';

interface Pet {
  image?: string;
  name: string;
  dateAdopted?: string;
  pet_type?: string;
}

@Component({
  selector: 'app-adoption',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './adoption.component.html',
  styleUrls: ['./adoption.component.css']
})
export class AdoptionComponent implements OnInit {
  pets: Pet[] = [];
  showMore: boolean = false;

  constructor(private petSectionService: PetSectionService) {}

  ngOnInit(): void {
    this.fetchAdoptablePets();
  }

  fetchAdoptablePets(): void {
    this.petSectionService.getPetsForAdoption().subscribe(
      (data: any[]) => {
        // Map each pet to include a dateAdopted (if needed)
        this.pets = data.map(pet => ({
          ...pet,
          dateAdopted: pet.dateAdopted || pet.updated_at || '-'
        }));
      },
      (error) => {
        console.error('Error fetching adoptable pets:', error);
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
