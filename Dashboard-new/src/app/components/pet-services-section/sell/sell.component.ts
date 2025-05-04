import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PetSectionService } from '../../petSection/service/PetSectionServices';

interface Pet {
  image?: string;
  name: string;
  dateSold?: string; // You may choose to use a field such as updated_at or a dedicated dateSold field.
  pet_type?: string;
  created_at?: string;
  allow_selling?: boolean;
  // Add more fields as needed.
}

@Component({
  selector: 'app-sell',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sell.component.html',
  styleUrls: ['./sell.component.css']
})
export class SellComponent implements OnInit {
  pets: Pet[] = [];
  showMore: boolean = false;

  constructor(private petSectionService: PetSectionService) {}

  ngOnInit(): void {
    this.fetchSellPets();
  }

  fetchSellPets(): void {
    // Assuming you have an endpoint to fetch pets that are sold:
    // For example, your backend might return pets where allow_selling is true.
    this.petSectionService.getPetsForSelling().subscribe(
      (data: any[]) => {
        this.pets = data.map(pet => ({
          ...pet,
          dateSold: pet.dateSold || pet.updated_at || '-'  // Use dateSold if available; otherwise fallback.
        }));
      },
      (error) => {
        console.error('Error fetching sold pets:', error);
      }
    );
  }

  togglePets(): void {
    this.showMore = !this.showMore;
  }
}
