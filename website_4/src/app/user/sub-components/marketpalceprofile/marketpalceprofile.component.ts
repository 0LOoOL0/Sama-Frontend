import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
@Component({
  selector: 'app-marketpalceprofile',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  templateUrl: './marketpalceprofile.component.html',
  styleUrl: './marketpalceprofile.component.css'
})
export class MarketpalceprofileComponent {
  products = [
    {
      name: 'Dried Dry Dog Food',
      price: '$12.39',
      originalPrice: '',
      image: 'path/to/dog-food.png',
      stars: [1, 2, 3, 4, 5],
      isOnSale: false,
    },
    {
      name: 'Flying Fish Cat Scratching',
      price: '$25.89',
      originalPrice: '',
      image: 'path/to/fish-scratching.png',
      stars: [1, 2, 3, 4],
      isOnSale: false,
    },
    {
      name: 'Tug Dog Toy',
      price: '$99.99',
      originalPrice: '',
      image: 'path/to/tug-toy.png',
      stars: [1, 2, 3, 4],
      isOnSale: false,
    },
    {
      name: 'Pink Spiked Collar',
      price: '$22.99',
      originalPrice: '',
      image: 'path/to/collar.png',
      stars: [1, 2, 3, 4],
      isOnSale: false,
    },
    {
      name: 'Squeez Ball Dog Toy',
      price: '$7.99',
      originalPrice: '$12.39',
      image: 'path/to/squeeze-ball.png',
      stars: [1, 2, 3, 4, 5],
      isOnSale: true,
    },
    {
      name: 'Hydrolyzed Dry Dog Food',
      price: '$12.39',
      originalPrice: '',
      image: 'path/to/dog-food2.png',
      stars: [1, 2, 3, 4, 5],
      isOnSale: false,
    }
  ];

  prev() {
    // Implement functionality for previous button
  }

  next() {
    // Implement functionality for next button
  }
}