import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { Router } from '@angular/router'
import { CouponService } from '../../app/services/CouponService' // adjust if needed

@Component({
  selector: 'app-coupon-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './coupon-details.component.html',
  styleUrls: ['./coupon-details.component.css']
})
export class CouponDetailsComponent {
  coupons: any[] = []
  loading = true
  error: string | null = null

  constructor(private router: Router, private couponService: CouponService) {}

  ngOnInit() {
    const providerId = 1; // Or dynamically get this
    this.couponService.getProviderCoupons(providerId).subscribe({
      next: (data) => {
        this.coupons = data.map(c => ({
          title: c.title_en,
          code: c.code,
          quantity: c.quantity,
          used: c.coupon_usages.length,
          expiration: c.expiration_date
        }));
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load coupon data.';
        this.loading = false;
      }
    });
  }
  

  goBackToDashboard() {
    this.router.navigate(['/provider-dashboard'])
  }
}
