import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NavbarComponent } from '../../../user/sub-components/navbar/navbar.component';

@Component({
  selector: 'app-promotion-page',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    NavbarComponent,
  ],
  templateUrl: './promotion-page.component.html',
  styleUrl: './promotion-page.component.css',
})
export class PromotionPageComponent {
  activeSection: string = 'ad'; // default to Ad Promotion section

  constructor(private router: Router) {}

  setActiveSection(section: string) {
    this.activeSection = section;
  }

  navigateToReadyToLaunch() {
    this.router.navigate(['/provider-main/ready-to-launch-promotion']);
  }

  navigateToCustomAdDesign() {
    this.router.navigate(['/provider-main/custom-ad-design-promotion']);
  }

  navigateToCouponDiscount() {
    this.router.navigate(['/provider-main/coupon-discount']);
  }
}