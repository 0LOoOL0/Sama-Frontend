import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';  // Import CommonModule here
import { Observable } from 'rxjs';

// Define the Collar interface
// Define the Collar interface
interface Collar {
  id: number;
  url: string;
  pet_id: number;
  product_id: number | null;
  pet: {
    name: string;
    pet_type: string;
    pet_owner: {
      first_name: string;
      last_name: string;
      phone: string;  // Added phone
      email: string;  // Added email
    };
    is_vaccinated: boolean;  // Added is_vaccinated
  };
  product: {
    name: string;
  } | null;
  created_at: string;
  updated_at: string;
}


// Define the response structure from the API
interface CollarResponse {
  data: Collar[];
}

@Component({
  selector: 'orders',
  standalone: true,  // Mark this component as standalone
  imports: [CommonModule],  // Import CommonModule to use the date pipe and other Angular features
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  collarsData: Collar[] = [];
  filteredCollars: Collar[] = [];

  private collarsUrl = 'http://127.0.0.1:8000/api/collars';  // Ensure correct endpoint

  constructor(private httpClient: HttpClient) {}

  ngOnInit(): void {
    this.fetchCollars();
  }

  getCollars(): Observable<CollarResponse> {
    return this.httpClient.get<CollarResponse>(this.collarsUrl);
  }

  fetchCollars(): void {
    this.getCollars().subscribe({
      next: (response) => {
        if (response && response.data && Array.isArray(response.data)) {
          this.collarsData = response.data;
          this.filteredCollars = [...this.collarsData];
        } else {
          console.error('Unexpected API response format', response);
          this.collarsData = [];
          this.filteredCollars = [];
        }
      },
      error: (error) => {
        console.error('API Fetch Error:', error);
      }
    });
  }
}
