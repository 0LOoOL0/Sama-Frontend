import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PetSectionService } from '../../petSection/service/PetSectionServices';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

interface Pet {
  image?: string;
  name: string;
  dateLost?: string;
  dateFound?: string;
  pet_type?: string;
  created_at?: string;
  is_lost?: boolean;
  // add more fields as needed
}

@Component({
  selector: 'app-lost',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lost.component.html',
  styleUrls: ['./lost.component.css']
})
export class LostComponent implements OnInit {
  pets: Pet[] = [];
  showMore: boolean = false;

  constructor(private petSectionService: PetSectionService) {}

  ngOnInit(): void {
    this.fetchLostPets();
  }

  fetchLostPets(): void {
    this.petSectionService.getPetsForLost().subscribe(
      (data: any[]) => {
        // Map each pet – for example, use created_at as fallback for dateLost
        this.pets = data.map(pet => ({
          ...pet,
          dateLost: pet.dateLost || pet.created_at || '-',
          dateFound: pet.dateFound || '-'
        }));
      },
      (error: any) => {
        console.error('Error fetching lost pets:', error);
      }
    );
  }

  togglePets(): void {
    this.showMore = !this.showMore;
  }
}
