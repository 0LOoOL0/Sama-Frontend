import { Component, OnInit } from '@angular/core';
 

@Component({
  selector: 'app-buycoupon',
  templateUrl: './buycoupon.page.html',
  styleUrls: ['./buycoupon.page.scss'],
})
export class BuycouponPage implements OnInit {
 
  coupon: any;

  constructor(  ) { }

  ngOnInit() {
 
  }
 
}

// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import { CouponService } from '../coupon.service';

// @Component({
//   selector: 'app-buycoupon',
//   templateUrl: './buycoupon.page.html',
//   styleUrls: ['./buycoupon.page.scss'],
// })
// export class BuycouponPage implements OnInit {
//   coupon: any;

//   constructor(
//     private route: ActivatedRoute,
//     private couponService: CouponService
//   ) { }

//   ngOnInit() {
//     this.loadCouponDetails();
//   }

//   loadCouponDetails() {
//     const couponId = this.route.snapshot.paramMap.get('id') as string; // Assert that couponId is a string
//     this.couponService.getCouponDetails(couponId).subscribe(data => {
//       this.coupon = data;
//     });
//   }

//   buyCoupon() {
//     // Implement the buy coupon functionality here
//   }
// }
