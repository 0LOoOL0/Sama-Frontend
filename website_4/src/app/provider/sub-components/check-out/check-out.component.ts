import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { environment } from '../../../../environments/environment';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { ProvidersService } from '../../../services/providers.service';

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
  couponError: string = '';
  adType: string = '';
  providerAddress: string = '';
  paymentError: string = '';

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private providersService: ProvidersService
  ) {
    this.checkoutForm = this.fb.group({
      couponCode: ['', Validators.required],
      paymentMethod: ['cash', Validators.required]
    });
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.adType = params['adType'];
      this.setBillAmount();
    });
    this.getProviderAddress();

  }
  getProviderAddress() {
    this.providersService.getAddress().subscribe(
      (response: any) => {
        this.providerAddress = response.data.address;
      },
      (error: any) => {
        console.error('Error fetching provider address', error);
        // Handle the error, maybe set a default address or show an error message
        this.providerAddress = 'Address not available';
      }
    );
  }

  setBillAmount() {
    switch (this.adType) {
      case 'ready_to_launch':
        this.bill.subtotal = 5000; // 5000 BDT
        break;
      case 'custom_ad_design':
        this.bill.subtotal = 10000; // 10000 BDT
        break;
      default:
        this.bill.subtotal = 0;
    }
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
    this.bill.total = this.bill.subtotal + this.bill.deliveryFee + this.bill.taxAndFee - this.bill.discount;
  }

  goToAddressPage() {
    this.router.navigate(['/provider-main/addresspage']);
  }

  checkout() {
    if (this.checkoutForm.get('paymentMethod')?.value !== 'cash') {
      this.paymentError = 'Please use a different payment method (Cash on Delivery)';
      return;
    }
    this.paymentError = '';
    this.router.navigate(['/provider-main/ad-approval']);
  }
}