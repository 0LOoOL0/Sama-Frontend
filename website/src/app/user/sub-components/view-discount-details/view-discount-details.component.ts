import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-view-discount-details',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  templateUrl: './view-discount-details.component.html',
  styleUrls: ['./view-discount-details.component.css']
})
export class ViewDiscountDetailsComponent {
  discountDetails = {
    date: '18/08/2024 18:38:58',
    id: '15879314569',
    service: 'Cat Grooming Services',
    image: 'assets/cat-grooming.jpg',
    originalPrice: 7.000,
    savedAmount: 3.000,
    finalPrice: 4.000,
    items: [
      { name: 'Bath & Brush', quantity: 1, price: 2.000 },
      { name: 'Nail Trim', quantity: 1, price: 1.000 },
      { name: 'Ear Cleaning', quantity: 1, price: 1.000 }
    ],
    provider: 'Happy Paws Pet Salon',
    location: 'Block 338, Road 3830, Manama'
  };
}