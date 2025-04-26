import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserAuthService } from '../../../../services/user-auth.service';
import { OrderService } from '../../../../services/order.service';
import { Router } from '@angular/router';
import { ReversePipe } from '../../../../shared/reverse/reverse.pipe';

@Component({
  selector: 'app-new-my-orders',
  standalone: true,
  imports: [CommonModule, ReversePipe],
  templateUrl: './new-my-orders.component.html',
  styleUrls: ['./new-my-orders.component.css']
})
export class NewMyOrdersComponent implements OnInit {
  userProfile: any;
  orderHistory: any[] = [];
  showDetails: boolean = false;
  selectedOrderForDetails: any = null;

  constructor(
    private userAuthService: UserAuthService,
    private orderService: OrderService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadUserProfile();
  }

  async loadUserProfile() {
    try {
      this.userProfile = await this.userAuthService.fetchProfileData();
      this.loadOrders();
    } catch (error) {
      console.error('Error loading user profile:', error);
    }
  }

  loadOrders() {
    if (this.userProfile && this.userProfile.id) {
      this.orderService.OrdersByUserId(this.userProfile.id)
        .subscribe(
          (orders: any) => {
            this.orderHistory = orders; // orders is assumed to be an array
            console.log('Order History:', this.orderHistory);
          },
          (error: any) => {
            console.error('Error loading orders:', error);
          }
        );
    }
  }

  orderAgain(i: number) {
    const confirmation = confirm("Are you sure you want to proceed with this order again?");
    const order = this.orderHistory[i];
    // Update order properties as needed before reordering
    order.invoice_date = new Date();
    order.status = 'pending';
    if (confirmation) {
      this.orderService.storeOrder(order)
        .subscribe(
          (response: any) => {
            alert("Order has been made");
            console.log("Order placed successfully:", response);
          },
          (error: any) => {
            console.error("Error placing order:", error);
          }
        );
    } else {
      console.log("Order again action cancelled.");
    }
  }

  viewDetail(i: number) {
    const order = this.orderHistory[i];
    this.router.navigate([`/user-main-component/order-detail/${order.id}`]);
  }

  toggleDetails(order: any) {
    if (this.selectedOrderForDetails === order) {
      this.showDetails = !this.showDetails;
    } else {
      this.selectedOrderForDetails = order;
      this.showDetails = true;
    }
  }
}
