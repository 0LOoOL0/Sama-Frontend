import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { SamastoreService } from '../services/samastore.service';

@Component({
  selector: 'order-info',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-info.component.html',
  styleUrls: ['./order-info.component.css']
})
export class OrderInfoComponent implements OnInit {
  order: any;

  constructor(
    private route: ActivatedRoute,
    private samastoreService: SamastoreService
  ) {}

  ngOnInit(): void {
    // Retrieve the order ID from the route parameters.
    const orderId = this.route.snapshot.paramMap.get('id');
    if (orderId) {
      // Call the updated service method to get the order details.
      this.samastoreService.getOrderById(orderId).subscribe(
        data => {
          this.order = data.data ? data.data : data;
          console.log('Order details loaded:', this.order);
        },
        error => {
          console.error('Error loading order details:', error);
        }
      );
      
    }
  }
}
