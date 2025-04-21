import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SamastoreService } from '../services/samastore.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'cust-orders',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cust-orders.component.html',
  styleUrls: ['./cust-orders.component.css']
})
export class CustomerOrdersComponent implements OnInit {
  owner: any;
  orders: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private samastoreService: SamastoreService,
    private router: Router  // Inject Router here
  ) {}

  ngOnInit(): void {
    const ownerId = this.route.snapshot.paramMap.get('id');
    if (ownerId) {
      this.loadOwnerData(ownerId);
      this.loadOwnerOrders(ownerId);
    } else {
      console.error('No owner id found in route');
    }
  }

  loadOwnerData(ownerId: string): void {
    // This method already exists to get pet owner details.
    this.samastoreService.getOwnerData(ownerId).subscribe(
      (data: any) => { 
        this.owner = data; 
        console.log('Owner data loaded:', this.owner);
      },
      (error: any) => { console.error('Error fetching owner data:', error); }
    );
  }

  loadOwnerOrders(ownerId: string): void {
    this.samastoreService.getOwnerOrders(ownerId).subscribe(
      (data: any[]) => { 
        this.orders = data; 
        console.log('Orders loaded:', this.orders);
      },
      (error: any) => { console.error('Error fetching owner orders:', error); }
    );
  }

  // Optional: compute total spent
  get totalSpent(): number {
    return this.orders.reduce((sum, order) => sum + Number(order.total_amount), 0);
  }

  // Navigation method to Order Info page
  navigateToOrderInfo(orderId: number): void {
    this.router.navigate(['/order-info', orderId]);
  }
}
