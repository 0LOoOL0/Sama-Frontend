import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserAuthService } from '../../../../services/user-auth.service';
import { OrderService } from '../../../../services/order.service';
import { Router } from '@angular/router';
import { ReversePipe } from '../../../../shared/reverse/reverse.pipe';

@Component({
  selector: 'app-new-my-orders',
  standalone: true,
  imports: [CommonModule,ReversePipe],
  templateUrl: './new-my-orders.component.html',
  styleUrl: './new-my-orders.component.css'
})
export class NewMyOrdersComponent implements OnInit{

  userProfile:any;
  orderHistory: any;

  // change for database later
  showDetails: boolean = false; // Property to control visibility
  details = {
    items: ['haircut', 'washing', 'trimming'],
    prices: ['2.000 BHD', '2.000 BHD', '3.000 BHD'],
  };

  constructor(private userAuthService: UserAuthService, private orderService: OrderService,
    private router:Router
  ) {}
  

  ngOnInit() {
    this.loadUserProfile();
    
  }

  
  toggleDetails() {
    this.showDetails = !this.showDetails; // Toggle the visibility
    console.log('Toggle Details:', this.showDetails);
}

  async loadUserProfile() {
    await this.userAuthService.fetchProfileData()
      .then((profileData: any) => {
        this.userProfile = profileData;
      })
      .catch(error => {
        console.error('Error loading user profile:', error);
      });
      this.loadOrders();
  }

  loadOrders(){
    // this.orderService.OrdersByUserId(this.userProfile.id).then((orders: any) => {
    //   this.orderHistory = orders.orders;
    //   console.log('his', this.orderHistory);
    // }).catch((error: any) => {
    //   console.error('Error loading orders: ', error);
    // });
  }

  orderAgain(i: number){
    const confirmation = confirm("Are you sure you want to proceed with this order again?");
    const order = this.orderHistory[i];
    order.order_date = new Date();
    order.status = 'pending';
    if (confirmation) {
      // this.orderService.storeOrder(order).subscribe(response => { 
      //   alert("Order has been made");
      //   console.log("Order placed successfully:", response);
      // });
    } else {
      // Handle the case when the user cancels the confirmation
      console.log("Order again action cancelled.");
    }
  }

  viewDetail(i: number){
    const id = this.orderHistory[i].id;
    this.router.navigate([`/user-main-component/order-detail/${id}`]);
  }



}
