import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { environment } from '../../../../environments/environment';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { UserServiceService } from '../../../services/user.service.service';
import { UserAuthService } from '../../../services/user-auth.service';
import { OrderService, NewOrder } from '../../../services/order.service';
import { ProductService } from '../../../services/product.service';
import { CartService } from '../../../services/cart.service';

interface CheckoutProduct {
  provider_id: number;
  product_name: string;
  product_id: number;
  amount: number;
  price: number;
  id: number;
  pet_id: number;
}

@Component({
  selector: 'app-check-out',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './check-out.component.html',
  styleUrl: './check-out.component.scss'
})
export class CheckOutComponent implements OnInit {
  checkoutForm: FormGroup;
  bill = {
    subtotal: 0,
    deliveryFee: 0,
    taxAndFee: 0,
    discount: 0,
    total: 0
  };
  isMember: boolean = false;
  checkoutProducts: CheckoutProduct[] = [];
  couponError: string = '';
  providerAddress: string = '';
  paymentError: string = '';
  profile: any;
  address = {
    a: '',
    b: '',
    c:'',
    d:'',
    e:'',
    f:'',
    g:'',
    h:'',
    i:''
  };
  displayedAdd: string = '';
  tt: number = 0;
  orderIds: any[] = [];

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private UserService: UserServiceService, private auth: UserAuthService, private ord: OrderService, 
    private pr: ProductService, private cartService: CartService
  ) {
    this.checkoutForm = this.fb.group({
      couponCode: ['', Validators.required],
      paymentMethod: ['cash', Validators.required]
    });
    this.getProfile();
    this.updateTotal();
    
    
  }
  ngOnInit() {
    this.cartService.currentTotalAmount.subscribe(amount => {
      this.bill.subtotal = amount;
    });
    const storedCheckoutProducts = localStorage.getItem('checkoutProducts');
    if (storedCheckoutProducts) {
      this.checkoutProducts = JSON.parse(storedCheckoutProducts);
    }
  }
  async getProfile(){
    const resp = await this.auth.getProfile();
    this.profile = resp;
    if(this.profile.location === 'office'){
      this.address.a = 'Location: ' + this.profile.location;
      this.address.b = ', City: ' + this.profile.city;
      this.address.c = ', Road: ' + this.profile.road;
      this.address.d = ', Block: ' + this.profile.block;
      this.address.e = ', Building: ' + this.profile.building_name;
      this.address.f = ', Floor: ' + this.profile.floor;
      this.address.g = ', Company: ' + this.profile.company;
      this.displayedAdd = this.address.a+this.address.b+this.address.c+this.address.d+this.address.e+this.address.f+this.address.g;    
    
    }else if(this.profile.location === 'house'){
      this.address.a = 'Location: ' + this.profile.location;
      this.address.b = ', City: ' + this.profile.city;
      this.address.c = ', House: ' + this.profile.house;
      this.address.d = ', Road: ' + this.profile.road;
      this.address.e = ', Block: ' + this.profile.block;
      this.displayedAdd = this.address.a+this.address.b+this.address.c+this.address.d+this.address.e;
    
    }else if(this.profile.location === 'apartment'){
      this.address.a = 'Location: ' + this.profile.location;
      this.address.b = ', City: ' + this.profile.city;
      this.address.c = ', Road: ' + this.profile.road;
      this.address.d = ', Block: ' + this.profile.block;
      this.address.e = ', Building: ' + this.profile.building_name;
      this.address.f = ', Apartment: ' + this.profile.apartment;
      this.address.g = ', Floor: ' + this.profile.floor;
      
      this.displayedAdd = this.address.a+this.address.b+this.address.c+this.address.d+this.address.e+this.address.f+this.address.g; 
    }
    this.isMember = this.profile.status != 'Non-member';
    }

  setBillAmount() {
    this.bill.taxAndFee = this.bill.subtotal * 0.05; // Assuming 5% tax
    this.updateTotal();
  }

  applyCoupon() {
    if (this.checkoutForm.get('couponCode')?.valid) {
      const providerId = 1; // To be replaced with actual provider ID
      this.http.post(`${environment.apiUrl}/apply-coupon`, {
        code: this.checkoutForm.get('couponCode')?.value,
        provider_id: providerId
      }).subscribe(
        (response: any) => {
          this.bill.discount = response.discount;
          this.updateTotal();
          this.couponError = '';
        },
        (error) => {
          this.couponError = error.error.error || 'Failed to apply coupon';
        }
      );
    }
  }

  updateTotal() {
    this.bill.total = Number(this.bill.subtotal) + Number(this.bill.deliveryFee) + Number(this.bill.taxAndFee) - Number(this.bill.discount);
  }

  checkout() {
    this.updateTotal();
    if (this.checkoutProducts.length === 0) {
      alert('Please add or select items to cart and proceed');
      this.router.navigate(['user-main-component/shopping-bag']);
    }
    if (this.checkoutForm.get('paymentMethod')?.value === 'cash') {
      
      const now = new Date();
      const currentTime = now.toLocaleTimeString();
      const order: NewOrder = {
        pet_owner_id: this.profile.id, // Ensure pet_owner_id is from the profile
        order_date: new Date().toISOString(), // Set order date to the current date
        amount: this.bill.total !== undefined ? parseFloat(this.bill.total.toFixed(2)) : 0, // Round amount to 2 decimal places
        discount_amount: this.bill.discount ? parseFloat(this.bill.discount.toFixed(2)) : 0, // Round discount_amount to 2 decimal places if available
        status: 'pending', // Default status
        metadata: JSON.stringify({
          products: this.checkoutProducts, 
        }),
      };
      this.ord.storeOrder(order);
      localStorage.removeItem('checkoutProducts');
      this.checkoutProducts.forEach(element => {
        this.cartService.deleteCart(element.id);
      });
      console.log('order has been taken', order);
      alert('Order has been made. Check my-orders page in your account profile to view your order');
      this.router.navigate(['user-main-component/my-orders']);
    }
  }
}