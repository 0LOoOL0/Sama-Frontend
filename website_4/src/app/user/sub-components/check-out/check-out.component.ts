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
import { MembershipService } from '../../../services/membership.service';

interface CheckoutProduct {
  provider_id: number;
  product_name: string;
  product_id: number;
  quantity: number;
  price: number;
  id: number;
  pet_id: number;
}

@Component({
  selector: 'app-check-out',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.scss']
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
    c: '',
    d: '',
    e: '',
    f: '',
    g: '',
    h: '',
    i: ''
  };
  displayedAdd: string = '';
  tt: number = 0;
  orderIds: any[] = [];

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private UserService: UserServiceService,
    private auth: UserAuthService,
    private ord: OrderService,
    private pr: ProductService,
    private cartService: CartService,
    private membershipService: MembershipService
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
    // Check for legacy checkoutProducts (order flow)
    const storedCheckoutProducts = localStorage.getItem('checkoutProducts');
    if (storedCheckoutProducts) {
      this.checkoutProducts = JSON.parse(storedCheckoutProducts);
    }
  }
  
  async getProfile() {
    const resp = await this.auth.getProfile();
    this.profile = resp;
    if (this.profile.location === 'office') {
      this.address.a = 'Location: ' + this.profile.location;
      this.address.b = ', City: ' + this.profile.city;
      this.address.c = ', Road: ' + this.profile.road;
      this.address.d = ', Block: ' + this.profile.block;
      this.address.e = ', Building: ' + this.profile.building_name;
      this.address.f = ', Floor: ' + this.profile.floor;
      this.address.g = ', Company: ' + this.profile.company;
      this.displayedAdd = this.address.a + this.address.b + this.address.c + this.address.d + this.address.e + this.address.f + this.address.g;
    } else if (this.profile.location === 'house') {
      this.address.a = 'Location: ' + this.profile.location;
      this.address.b = ', City: ' + this.profile.city;
      this.address.c = ', House: ' + this.profile.house;
      this.address.d = ', Road: ' + this.profile.road;
      this.address.e = ', Block: ' + this.profile.block;
      this.displayedAdd = this.address.a + this.address.b + this.address.c + this.address.d + this.address.e;
    } else if (this.profile.location === 'apartment') {
      this.address.a = 'Location: ' + this.profile.location;
      this.address.b = ', City: ' + this.profile.city;
      this.address.c = ', Road: ' + this.profile.road;
      this.address.d = ', Block: ' + this.profile.block;
      this.address.e = ', Building: ' + this.profile.building_name;
      this.address.f = ', Apartment: ' + this.profile.apartment;
      this.address.g = ', Floor: ' + this.profile.floor;
      this.displayedAdd = this.address.a + this.address.b + this.address.c + this.address.d + this.address.e + this.address.f + this.address.g;
    }
    this.isMember = this.profile.status != 'Non-member';

    this.displayedAdd = `Building: ${this.profile.building || '-'}, Road: ${this.profile.road || '-'}, Block: ${this.profile.block || '-'}`;

  }
  
  setBillAmount() {
    this.bill.taxAndFee = this.bill.subtotal * 0.05; // Assuming 5% tax
    this.updateTotal();
  }
  
  applyCoupon() {
    if (this.checkoutForm.get('couponCode')?.valid) {
      const providerId = 1; // Replace with actual provider ID if needed
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
  
    const tempCartString = localStorage.getItem('tempCart');
  
    // ✅ Handle Membership Checkout
    if (tempCartString) {
      const tempCart = JSON.parse(tempCartString);
      if (tempCart.package) {
        const membershipPayload = {
          package_id: tempCart.package.id,
          pet_ids: tempCart.pet_ids,
          status: 'active'
        };
  
        this.membershipService.storeMembership(membershipPayload).subscribe(
          () => {
            localStorage.removeItem('tempCart');
            this.router.navigate(['user-main-component/my-cards']);
          },
          error => {
            console.error('Error creating membership:', error);
            alert('Error creating membership. Please try again.');
          }
        );
        return;
      }
    }
  
    // ✅ Ensure cart has items
    if (!this.checkoutProducts || this.checkoutProducts.length === 0) {
      alert('Please add or select items to cart and proceed');
      this.router.navigate(['user-main-component/shopping-bag']);
      return;
    }
  
    const now = new Date();
    const orderPayload = {
      invoice_date: now.toISOString().split('T')[0], // MySQL date format
      status: 'pending',
      customer_name: this.profile?.ownerName?.trim() || 'No Name Provided',
      contact_no: this.profile?.contactNumber?.trim() || '0', // ✅ Actual field from your profile
      email: this.profile?.email || 'no-email@example.com',
      address: this.displayedAdd || 'Unknown address',
      delivery: this.bill.deliveryFee || 0,
      pet_owner_id: this.profile?.id,
      products: this.checkoutProducts.map(p => ({
        product_id: p.product_id,
        quantity: p.quantity || 1,
 // ✅ Use correct field for quantity
        discount_percentage: 0
      }))
    };
  
    // ✅ Log full payload
    console.log('%c📤 Sending Order Payload:', 'color: green; font-weight: bold;', orderPayload);
  
    this.ord.storeOrder(orderPayload as any).subscribe(
      () => {
        localStorage.removeItem('checkoutProducts');
        localStorage.removeItem('tempCart'); // Just in case
        this.checkoutProducts.forEach(p => {
          if (p.id !== undefined) {
            this.cartService.deleteCart(p.id).subscribe();
          }
        });
        alert('Order placed successfully!');
        this.router.navigate(['user-main-component/sama-store']);
      },
      err => {
        console.error('%c❌ Order submission failed:', 'color: red;', err);
        alert('Failed to place order. Please check your form and try again.');
      }
    );
  }
  
  
  
  
  
}
