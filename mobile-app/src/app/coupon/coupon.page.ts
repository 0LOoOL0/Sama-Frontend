import { Component, OnInit } from '@angular/core';
import { PetInfoService, Pet } from '../services/pet-info.service'; 
import { AuthService } from '../services/auth.service'; 
import * as QRCode from 'qrcode';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Observable, from, forkJoin } from 'rxjs';
import { ModalController, AlertController  } from '@ionic/angular';
import { map, switchMap } from 'rxjs/operators';
import { CouponService, Coupon, CouponUsage } from '../services/coupon.service';
@Component({
  selector: 'app-coupon',
  templateUrl: './coupon.page.html',
  styleUrls: ['./coupon.page.scss'],
})
export class CouponPage implements OnInit {
  coupons: Coupon[] = [];
  segment: string = 'coupons';
  pets: any[] = [];
  profile: any = {};
  petOwnerId: number = 0;  
  constructor(
    private couponService: CouponService,
    private authService: AuthService,
    private petInfoService: PetInfoService,
    private navCtrl: NavController,
    private router: Router,
    private modalController: ModalController,
    private alertController: AlertController, 
  ) { }

  async ngOnInit() {
    try {
      const profileData = await this.authService.fetchProfileData();
      this.profile = profileData;
      console.log('Profile data:', this.profile);
      this.petOwnerId = this.profile.id;
      
      await this.fetchNotMembershipCoupons();
  
    } catch (error) {
      console.error('Error initializing component:', error);
    }
  }
  // coupons = [
  //   { title: 'PETS CABANA', description: 'Get your 30% off accessories', date: '30 June 2023', price: '10$' },
  //   { title: 'PETS CABANA', description: 'Get your 30% off accessories', date: '30 June 2023', price: '10$' },
  //   { title: 'PETS CABANA', description: 'Get your 30% off accessories', date: '30 June 2023', price: '10$' },
  //   { title: 'PETS CABANA', description: 'Get your 30% off accessories', date: '30 June 2023', price: '10$' },
  //   { title: 'PETS CABANA', description: 'Get your 30% off accessories', date: '30 June 2023', price: '10$' },
  //   { title: 'PETS CABANA', description: 'Get your 30% off accessories', date: '30 June 2023', price: '10$' },
  //   { title: 'PETS CABANA', description: 'Get your 30% off accessories', date: '30 June 2023', price: '10$' },
  //   { title: 'PETS CABANA', description: 'Get your 30% off accessories', date: '30 June 2023', price: '10$' },
  //   { title: 'PETS CABANA', description: 'Get your 30% off accessories', date: '30 June 2023', price: '10$' },
  // ];

  onCategoryChange(event: any) {
 
    console.log('Selected Category:', event.detail.value);
  }

  async fetchNotMembershipCoupons() {
    if (this.coupons.length > 0) {
      console.log('Coupons already fetched:', this.coupons);
      return; 
    }
  
    try {
      // Fetch used coupons from the service directly
      const couponUsages = await this.couponService.getCouponUsagesByOwnerId(this.petOwnerId).toPromise();
      console.log('Fetched coupon usages:', couponUsages);
      
      // Ensure couponUsages is an array before using map
      const usedCouponIds = Array.isArray(couponUsages) 
        ? couponUsages.map(couponUsage => couponUsage.coupon_id) 
        : [];
        
      console.log('Used Coupon IDs:', usedCouponIds);
  
      // Fetch membership coupons
      this.couponService.getMembershipCoupons().subscribe(
        (coupons: Coupon[]) => {
          console.log('Fetched membership coupons:', coupons);
  
          // Filter out used coupons
          this.coupons = coupons.filter(coupon => !usedCouponIds.includes(coupon.id));
          console.log('Available coupons after removing used ones:', this.coupons);
        },
        (error) => {
          console.error('Error fetching membership coupons:', error);
        }
      );
    } catch (error) {
      console.error('Error fetching coupon usages:', error);
    }
  }

  async checkout(couponId: number, price: number) { // Accept both couponId and price as arguments
    // Save the coupon ID and price in local storage
    localStorage.setItem('checkoutCoupon', JSON.stringify({ id: couponId, price: price }));
    
    // Navigate to the checkout page, passing the price if needed
    this.router.navigate(['/check-out', 'coupon', price]);
  } 

}
