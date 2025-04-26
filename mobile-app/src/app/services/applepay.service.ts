import { Injectable } from '@angular/core';
import { ApplePay, PaymentNetwork, PaymentRequest as CapacitorPaymentRequest } from 'capacitor-apple-pay';

@Injectable({
  providedIn: 'root',
})
export class ApplePayService {
  constructor() {}

  async startApplePaySession(amount: number): Promise<void> {
    try {
      const canMakePayments = await ApplePay.canMakePayments();
      if (!canMakePayments.isPayment) {
        console.error('Apple Pay is not supported on this device or browser.');
        return;
      }

      // Use the PaymentRequest type from the capacitor-apple-pay package
      const paymentRequest: CapacitorPaymentRequest = {
        merchantIdentifier: 'YourMerchantIdentifier', // Replace with your actual merchant identifier
        countryCode: 'US',
        currencyCode: 'USD',
        supportedNetworks: ['visa', 'masterCard', 'amex'] as PaymentNetwork[],
        merchantCapabilities: ['capability3DS'],
        paymentSummaryItems: [
          {
            label: 'Your Store',
            amount: parseFloat(amount.toFixed(2)), // Ensure this is a string, as per your original usage
          },
        ],
      };

      const paymentResponse = await ApplePay.makePaymentRequest(paymentRequest);
      if (paymentResponse) {
        console.log('Apple Pay payment was successful:', paymentResponse);
      } else {
        console.error('Apple Pay payment failed.');
      }
    } catch (error) {
      console.error('Error initiating Apple Pay session:', error);
    }
  }
}

