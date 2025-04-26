import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
@Component({
  selector: 'app-booking-service-page',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './booking-service-page.component.html',
  styleUrls: ['./booking-service-page.component.css']
})
export class BookingServicePageComponent implements OnInit {

  serviceName: string = 'Emergency Service';
  price: number = 79.99;
  topServices: any[] = [
    { name: 'Flying Fish Cat Scratching Toy', price: 12.99, img: 'assets/top-service-1.jpg' },
    { name: 'Top Dog Toy', price: 8.99, img: 'assets/top-service-2.jpg' },
    { name: 'Pink Spiked Collar', price: 9.99, img: 'assets/top-service-3.jpg' }
  ];

  constructor() {}

  ngOnInit(): void {}

  buyService(): void {
    console.log('Service Purchased:', {
      name: this.serviceName,
      price: this.price
    });
  }
}
