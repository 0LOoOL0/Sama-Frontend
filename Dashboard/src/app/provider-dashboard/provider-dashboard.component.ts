import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { ProviderHeaderComponent } from '../components/share/header/Provider-header/ProviderHeader.component'
import { ProductService } from '../../app/services/ProductService'; // adjust path
import { CouponService } from '../../app/services/CouponService'; // adjust path
import { ServiceService } from '../../app/services/ServiceService'; // adjust path


@Component({
  selector: 'app-provider-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, ProviderHeaderComponent],
  templateUrl: './provider-dashboard.component.html',
  styleUrls: ['./provider-dashboard.component.css']
})
export class ProviderDashboardComponent {
  policyNumber = ''
  showPolicyInput = false

  totalSales = 0
  totalAmountCollected = 0
  totalProducts = 0
  productList: any[] = [];
  showProductDetails = false;
  loadingSales = true
  loadingProducts = true
  error: string | null = null

  
  constructor(private productService: ProductService, private router: Router, private couponService: CouponService, private serviceService: ServiceService) {}


  ngOnInit() {
    this.fetchSalesOverview()
    this.fetchProductOverview()
    this.fetchPromotionOverview()
    this.fetchCouponOverview()
    this.fetchLastReportDate()
  }
  
  

  goToPetDetails(): void {
    if (this.policyNumber.trim()) {
      this.router.navigate(['/pet-policy-details', this.policyNumber])
    }
  }

  navigateTo(path: string): void {
    this.router.navigate([`/${path}`])
  }

  fetchSalesOverview() {
    this.loadingSales = true;
    const providerId = 1;
  
    this.serviceService.getSalesOverview(providerId).subscribe({
      next: (data) => {
        this.totalSales = data.total_services;
        this.totalAmountCollected = data.total_amount;
        this.loadingSales = false;
      },
      error: () => {
        this.totalSales = 0;
        this.totalAmountCollected = 0;
        this.loadingSales = false;
      }
    });
    
  }
  

  fetchProductOverview() {
    this.loadingProducts = true;
    const providerId = 1; // hardcoded or get dynamically if needed
  
    this.productService.getProviderProducts(providerId).subscribe({
      next: (products) => {
        this.totalProducts = products.length;
        this.loadingProducts = false;
      },
      error: () => {
        this.totalProducts = 0;
        this.loadingProducts = false;
      }
    });
  }
  

  navigateToSalesReport() {
    this.router.navigate(['/sales-report'])
  }

  navigateToProductDetails() {
    this.router.navigate(['/product-details'])
  }

  totalPromotions = 0
lastPromotionDate = ''
loadingPromotions = true

fetchPromotionOverview() {
  setTimeout(() => {
    this.totalPromotions = 2
    this.lastPromotionDate = '2025-04-12'
    this.loadingPromotions = false
  }, 1000) // Simulated backend delay
}

totalActiveCoupons = 0
totalUsedCoupons = 0
loadingCoupons = true

fetchCouponOverview() {
  this.loadingCoupons = true;
  const providerId = 1;

  this.couponService.getCouponStats(providerId).subscribe({
    next: (res) => {
      this.totalActiveCoupons = res.active;
      this.totalUsedCoupons = res.used;
      this.loadingCoupons = false;
    },
    error: () => {
      this.totalActiveCoupons = 0;
      this.totalUsedCoupons = 0;
      this.loadingCoupons = false;
    }
  });
}
lastReportDate = ''

fetchLastReportDate() {
  // Replace with real API call if needed
  setTimeout(() => {
    this.lastReportDate = '2025-04-15' // should come from DB or API in production
  }, 800)
}
goToReport() {
  this.router.navigate(['/provider-report'])
}

}

