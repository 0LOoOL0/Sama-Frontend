import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SamastoreService } from '../services/samastore.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'sama-orders',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sama-orders.component.html',
  styleUrls: ['./sama-orders.component.css']
})
export class SamaOrdersComponent implements OnInit {
  orders: any[] = [];

  constructor(private router: Router, private samastoreService: SamastoreService) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    // Use the getAllOrders() method instead of getAllInvoices()
    this.samastoreService.getAllOrders().subscribe(
      data => {
        this.orders = data;
        console.log('Orders loaded:', this.orders);
      },
      error => {
        console.error('Error fetching orders:', error);
      }
    );
  }

  orderDetails(order: any): void {
    this.router.navigate(['/order-info', order.id]);
  }

  customerOrders(order: any): void {
    if (order.pet_owner_id) {
      this.router.navigate(['/cust-orders', order.pet_owner_id]);
    } else {
      console.error('No pet owner id found in order:', order);
    }
  }

  // Helper method for payment status
  getPaymentStatus(order: any): string {
    return order.status.toLowerCase() === 'paid' ? 'Paid' : 'Unpaid';
  }
}
