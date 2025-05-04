import { Component } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../../../services/order.service';
import { UserAuthService } from '../../../services/user-auth.service';

@Component({
  selector: 'app-order-detail',
  standalone: true,
  imports: [NavbarComponent, CommonModule],
  templateUrl: './order-detail.component.html',
  styleUrl: './order-detail.component.css'
})
export class OrderDetailComponent {
  orderId: number = 0;
  order: any;
  profile: any;

  constructor(private route:ActivatedRoute, private location: Location, private orderService: OrderService, 
    private userAuthService: UserAuthService){
      this.loadUserProfile();
      this.route.paramMap.subscribe(async params => {
      this.orderId = Number(params.get('id')); // Get the order ID from route parameters
      if (this.orderId) {
        this.loadOrderData(this.orderId); // Load order data
      }else{
        this.location.back();
      }
      });
  }

  async loadUserProfile() {
    await this.userAuthService.fetchProfileData()
      .then((profileData: any) => {
        this.profile = profileData;
      })
      .catch(error => {
        console.error('Error loading user profile:', error);
      });
  }

  async loadOrderData(id: number) {
  try {
    const orders = await this.orderService.OrderById(id);
    const order : any = orders;
    // Check if the user is authorized to view the order
    if (order && this.profile.id != order.order.pet_owner_id) {
      console.log('User is not authorized to view this order.');
      this.location.back();
    }
    this.order = order.order;
    console.log('order', this.order);
  } catch (error) {
    console.error('Error loading orders:', error);
  }
}
  
}
