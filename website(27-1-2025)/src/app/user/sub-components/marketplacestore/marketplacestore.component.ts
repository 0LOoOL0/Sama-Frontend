import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
@Component({
  selector: 'app-marketplacestore',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  templateUrl: './marketplacestore.component.html',
  styleUrl: './marketplacestore.component.css'
})
export class MarketplacestoreComponent {
  products = [
    { name: 'Bagle cat', price: 'BHD 80', image: 'path-to-image' },
    // Add more product details as necessary
  ];
}