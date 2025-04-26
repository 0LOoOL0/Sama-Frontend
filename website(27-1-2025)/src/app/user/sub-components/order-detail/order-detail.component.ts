import { Component, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { ActivatedRoute } from '@angular/router';
import { OrderService, Order } from '../../../services/order.service';
import { UserAuthService } from '../../../services/user-auth.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-order-detail',
  standalone: true,
  imports: [NavbarComponent, CommonModule],
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {
  orderId: number = 0;
  order!: Order;
  profile: any;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private orderService: OrderService,
    private userAuthService: UserAuthService
  ) {}

  ngOnInit(): void {
    this.loadUserProfile();
    this.route.paramMap.subscribe(async params => {
      const idParam = params.get('id');
      if (idParam) {
        this.orderId = +idParam;
        await this.loadOrderData(this.orderId);
      } else {
        this.location.back();
      }
    });
  }

  async loadUserProfile() {
    try {
      this.profile = await this.userAuthService.fetchProfileData();
    } catch (error) {
      console.error('Error loading user profile:', error);
    }
  }

  async loadOrderData(id: number) {
    try {
      // Use getOrderById and convert the Observable to a Promise with firstValueFrom
      const order: Order = await firstValueFrom(this.orderService.getOrderById(id));
      // Check if the logged-in user is authorized to view the order
      if (order && this.profile && this.profile.id !== order.pet_owner_id) {
        console.log('User is not authorized to view this order.');
        this.location.back();
      } else {
        this.order = order;
        console.log('Order:', this.order);
      }
    } catch (error) {
      console.error('Error loading orders:', error);
    }
  }
}
