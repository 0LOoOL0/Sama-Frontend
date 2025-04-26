import { Component } from '@angular/core';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
})
export class CheckoutPage {
  paymentMethod: string = 'card';
  cardNumber: string = 'xxxxx-1234';
  cardExpiry: string = '12/25';
  couponCode: string = '';
  subtotal: number = 39.99;
  tax: number = 3.00;
  discount: number = 0.00;
  total: number = 42.99;

  newCardNumber: string = '';
  newCardExpiry: string = '';
  newCardCVV: string = '';

  constructor() {
    this.calculateTotal();
  }

  onPaymentMethodChange(event: any) {
    this.paymentMethod = event.detail.value;
  }

  selectCard(method: string) {
    this.paymentMethod = method;
    if (method === 'card') {
      // Set default saved card details
      this.newCardNumber = this.cardNumber;
      this.newCardExpiry = this.cardExpiry;
      this.newCardCVV = '';
    } else {
      // Clear new card details if other payment method is selected
      this.newCardNumber = '';
      this.newCardExpiry = '';
      this.newCardCVV = '';
    }
  }

  applyCoupon() {
    // Logic to apply coupon code
    // For demo purposes, we will set a fixed discount
    if (this.couponCode === 'DISCOUNT10') {
      this.discount = 10.00;
    } else {
      this.discount = 0.00;
    }
    this.calculateTotal();
  }

  calculateTotal() {
    this.total = this.subtotal + this.tax - this.discount;
  }

  checkout() {
    if (this.paymentMethod === 'new-card') {
      console.log('New card details:', {
        cardNumber: this.newCardNumber,
        cardExpiry: this.newCardExpiry,
        cardCVV: this.newCardCVV
      });
    } else if (this.paymentMethod === 'card') {
      console.log('Checkout with saved card:', {
        cardNumber: this.cardNumber,
        cardExpiry: this.cardExpiry
      });
    } else if (this.paymentMethod === 'cod') {
      console.log('Checkout with cash on delivery');
    }
  }
}
