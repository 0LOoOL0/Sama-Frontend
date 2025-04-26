import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { CodeService } from '../services/code.service';
import { AlertController } from '@ionic/angular'; 
import { OrderService } from '../services/order.service';  // Import the OrderService
import { Order, NewOrder } from '../services/order.service';  
import { PaymentService } from '../services/payment.service';
import { Payment } from '../services/payment.service'; 
import { PackageService, Membership } from '../services/package.service';

interface Address {
  house: string;
  province: string;
  city: string;
  block: string;
}

interface CheckoutProduct {
  provider_id: number;
  product_name: string;
  product_id: number;
  amount: number;
  price: number;
}

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.page.html',
  styleUrls: ['./check-out.page.scss'],
})
export class CheckOutPage implements OnInit {
  list: Address[] = [];
  profile: any = {};
  total: number | undefined;
  buttonText: string = 'Apply';
  discountCode: string = ''; 
  discount: number | undefined; 
  paymentMethod: string | null = null;
  discounted: number = 0; 
  type: string = 'cart'; 
  checkoutProducts: CheckoutProduct[] = [];
  sectotal: number | undefined;
  constructor(
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private codeService: CodeService,
    private alertController: AlertController,
    private packagesService: PackageService,
    private paymentService: PaymentService,
    private orderService: OrderService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.total = +this.activatedRoute.snapshot.paramMap.get('total')!;
    this.sectotal = +this.activatedRoute.snapshot.paramMap.get('total')!;
    this.type = this.activatedRoute.snapshot.paramMap.get('type')!;
    const storedCheckoutProducts = localStorage.getItem('checkoutProducts');
    if (storedCheckoutProducts) {
      this.checkoutProducts = JSON.parse(storedCheckoutProducts);
    }
    this.authService
    .fetchProfileData()
    .then(profileData => {
      this.profile = profileData;
      console.log('Profile data:', this.profile);
    })
    .catch(error => {
      console.error('Error fetching profile data:', error);
    });

  }

  apply() {
    if (this.buttonText === 'Apply') {
      if (!this.discountCode.trim()) {
        console.error('Please enter a discount code.');
        return;
      }
      // Save the discount code to localStorage
      console.log(this.discountCode)
      localStorage.setItem('discountCode', this.discountCode);
      this.buttonText = 'Remove';
      // Fetch the discount code details
      this.codeService.getCodeByCode(this.discountCode).subscribe({
        next: async (code) => {
          if (code && code.percentage !== undefined) {
            this.discount = code.percentage;
            this.calculateDiscountedTotal();
          } else {
            await this.showInvalidCodeAlert();
            localStorage.removeItem('discountCode');
            this.discountCode = '';
            this.discount = undefined;
            this.buttonText = 'Apply';
          }
        },
        error: async (err) => {
          console.error('Error fetching discount code:', err);
          await this.showInvalidCodeAlert();
          localStorage.removeItem('discountCode');
          this.discountCode = '';
          this.discount = undefined;
          this.buttonText = 'Apply';
        }
      });
    } 
     else {
      // Remove the discount code
      localStorage.removeItem('discountCode');
      this.buttonText = 'Apply';
      this.discount = undefined;
      this.discountCode = '';
      // Ensure the total is refreshed correctly
      this.total = +this.activatedRoute.snapshot.paramMap.get('total')!;
    }
  }

  calculateDiscountedTotal() {
    if (this.total !== undefined && this.discount !== undefined) {
      const discountAmount = this.total * this.discount / 100;
      this.sectotal = parseFloat((this.total - discountAmount).toFixed(2));
      this.discounted = parseFloat(discountAmount.toFixed(2));
    }
  }
  
  private async showInvalidCodeAlert() {
    const alert = await this.alertController.create({
      header: 'Invalid Discount Code',
      message: 'The discount code is either invalid or has expired.',
      buttons: ['OK'],
      cssClass: 'custom-alert' 
    });

    await alert.present();
  }
  
  async placeOrder() {
    if (this.type === "cart") {
    if (this.checkoutProducts.length === 0) {
      const alert = await this.alertController.create({
        header: 'Alert',
        message: 'Your cart is empty. Please add items to your cart before checking out.',
        buttons: ['OK'],
      });
      await alert.present();
      return; // Exit if cart is empty
    }
  
    // Prepare the order object
    const order: NewOrder = {
      pet_owner_id: this.profile.id, // Ensure pet_owner_id is from the profile
      order_date: new Date().toISOString(), // Set order date to the current date
      amount: this.sectotal !== undefined ? parseFloat(this.sectotal.toFixed(2)) : 0, // Round amount to 2 decimal places
      discount_amount: this.discounted ? parseFloat(this.discounted.toFixed(2)) : 0, // Round discount_amount to 2 decimal places if available
      status: 'pending', // Default status
      metadata: JSON.stringify({
        products: this.checkoutProducts, 
      }),
    };

    try {
      // Place the order
      const createdOrder = await this.orderService.storeOrder(order);
      console.log('Order placed successfully:', createdOrder);

      const now = new Date();
      const paymentDate = `${now.getFullYear()}-${(now.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')} ${now
      .getHours()
      .toString()
      .padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now
      .getSeconds()
      .toString()
      .padStart(2, '0')}`;

      // Prepare the payment object
      const payment: Payment = {
        pet_owner_id: this.profile.id,
        provider_id: null,
        card_id: null,
        order_id: createdOrder.id, 
        coupon_id: null,
        package_id: null,
        payment_method: this.paymentMethod || 'default',
        amount: this.sectotal || 0,
        discount_amount: this.discounted || 0,
        currency: 'USD',  // Specify your currency
        transaction_id: null,  // Set if available
        status: 'pending',
        payment_date: paymentDate, 
        metadata: JSON.stringify({
          order: createdOrder,  // Store order details in metadata
        }),
      };

      // Store the payment
      const createdPayment = await this.paymentService.storePayment(payment);
      console.log('Payment recorded successfully:', createdPayment);

      // Clear the cart after successful order and payment
      localStorage.removeItem('checkoutProducts');
      
      // if (this.paymentMethod === 'ApplePay') {
      //   await this.applePayService.startApplePaySession(this.sectotal);
      // }

      // Navigate to a thank you page
      this.router.navigate(['/congratulation-page', 'order']); 
    } catch (error) {
      console.error('Error processing order or payment:', error);
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'There was in processing payment. Please try again.',
        buttons: ['OK'],
      });
      await alert.present();
    }
  } else if (this.type === "coupon") {
    try {
      // Retrieve the coupon ID from localStorage
      const checkoutCoupon = JSON.parse(localStorage.getItem('checkoutCoupon') || '{}');
      const couponId = checkoutCoupon?.id;

      if (!couponId) {
        throw new Error('Coupon ID not found in local storage.');
      }

      const now = new Date();
      const paymentDate = `${now.getFullYear()}-${(now.getMonth() + 1)
        .toString()
        .padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')} ${now
        .getHours()
        .toString()
        .padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now
        .getSeconds()
        .toString()
        .padStart(2, '0')}`;

      // Prepare the payment object for coupon-only order
      const payment: Payment = {
        pet_owner_id: this.profile.id,
        provider_id: null,
        card_id: null,
        order_id: null,
        coupon_id: couponId, // Only coupon ID is stored
        package_id: null,
        payment_method: this.paymentMethod || 'default',
        amount: checkoutCoupon.price || 0, // Use the price from local storage
        discount_amount: this.discounted || 0,
        currency: 'USD',
        transaction_id: null,
        status: 'pending',
        payment_date: paymentDate,
        metadata: JSON.stringify({
          coupon_id: couponId,
        }),
      };

      // Store the payment
      const createdPayment = await this.paymentService.storePayment(payment);
      console.log('Payment recorded successfully:', createdPayment);

      // Clear coupon from local storage after payment
      localStorage.removeItem('checkoutCoupon');

      // Navigate to a thank you page
      this.router.navigate(['/congratulation-page', 'coupon']);
    } catch (error) {
      console.error('Error processing coupon payment:', error);
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'There was an issue processing payment. Please try again.',
        buttons: ['OK'],
      });
      await alert.present();
    }
  } else if (this.type === "sub") { // Handle subscription type
    try {
      // Retrieve membership data from local storage
      const membershipData = JSON.parse(localStorage.getItem('membershipData') || '{}');

      if (!membershipData || !membershipData.package_id) {
        throw new Error('Membership data not found in local storage.');
      }

      // Store the membership using the existing membershipData
      const createdMembership = await this.packagesService.storeMembership(membershipData);
      console.log('Membership stored successfully:', createdMembership.data); // Assuming the response contains membership data

      const now = new Date();
      const paymentDate = `${now.getFullYear()}-${(now.getMonth() + 1)
        .toString()
        .padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')} ${now
        .getHours()
        .toString()
        .padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now
        .getSeconds()
        .toString()
        .padStart(2, '0')}`;

      // Prepare the payment object for subscription
      const payment: Payment = {
        pet_owner_id: this.profile.id,
        provider_id: null,
        card_id: null,
        order_id: null,
        coupon_id: null,
        package_id: membershipData.package_id, // Use package_id from membership data
        payment_method: this.paymentMethod || 'default',
        amount: membershipData.price || 0, // Use the price from membership data
        discount_amount: this.discounted || 0,
        currency: 'USD',
        transaction_id: null,
        status: 'pending',
        payment_date: paymentDate,
        metadata: JSON.stringify({
          membership_id: membershipData.package_id,
        }),
      };

      // Store the payment
      const createdPayment = await this.paymentService.storePayment(payment);
      console.log('Payment recorded successfully:', createdPayment);

      // Clear membership data from local storage after payment
      localStorage.removeItem('membershipData');

      // Navigate to a thank you page
      this.router.navigate(['/congratulation-page', 'membership']);
    } catch (error) {
      console.error('Error processing subscription payment:', error);
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'There was an issue processing subscription payment. Please try again.',
        buttons: ['OK'],
      });
      await alert.present();
    }
  }
}
}