import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
@Component({
  selector: 'app-discount-page',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './discount-page.component.html',
  styleUrls: ['./discount-page.component.css']
})
export class DiscountPageComponent implements OnInit {

  freeCoupons: any[] = [
    { title: '50% Off Pet Accessories', img: 'assets/coupon-1.png', description: 'Get 50% off on selected pet accessories.' },
    { title: 'Discount on Cat Supplies', img: 'assets/coupon-2.png', description: 'Save big on cat supplies today.' },
    { title: 'Walking / Active Dogs', img: 'assets/coupon-3.png', description: 'Free walking services for active dogs.' }
  ];

  purchasedCoupons: any[] = [
    { title: 'Dry Dog Treats Collection', img: 'assets/coupon-4.png', description: 'Get premium dog treats at discounted prices.' },
    { title: 'Grooming Discount', img: 'assets/coupon-5.png', description: 'Save on grooming sessions for your pet.' },
    { title: 'Diamond Cat Supplies', img: 'assets/coupon-6.png', description: 'Exclusive discounts on premium cat supplies.' }
  ];

  constructor() {}

  ngOnInit(): void {}

  redeemCoupon(coupon: string): void {
    console.log('Coupon redeemed:', coupon);
  }

  buyCoupon(coupon: string): void {
    console.log('Coupon purchased:', coupon);
  }
}
