import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-discount-history',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  templateUrl: './discount-history.component.html',
  styleUrls: ['./discount-history.component.css']
})
export class DiscountHistoryComponent {
  discountHistory = [
    {
      date: '18/08/2024 18:38:58',
      id: '15879314569',
      service: 'Cat Grooming Services',
      image: 'assets/cat-grooming.jpg',
      originalPrice: 7.000,
      savedAmount: 3.000,
      finalPrice: 4.000,
      items: 3
    },
    {
      date: '15/07/2024 14:22:31',
      id: '15879314570',
      service: 'Cat Grooming Services',
      image: 'assets/cat-grooming.jpg',
      originalPrice: 7.000,
      savedAmount: 3.000,
      finalPrice: 4.000,
      items: 3
    },
    {
      date: '02/06/2024 09:15:47',
      id: '15879314571',
      service: 'Cat Grooming Services',
      image: 'assets/cat-grooming.jpg',
      originalPrice: 7.000,
      savedAmount: 3.000,
      finalPrice: 4.000,
      items: 3
    }
  ];
}