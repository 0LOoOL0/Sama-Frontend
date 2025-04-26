import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-provider-customadv',
  templateUrl: './provider-customadv.page.html',
  styleUrls: ['./provider-customadv.page.scss'],
})
export class ProviderCustomadvPage implements OnInit {

  formData = {
    businessName: '',
    discountDescription: '',
    expiryDay: null,
    expiryMonth: null,
    expiryYear: null
  };

  days: number[] = Array.from({ length: 31 }, (_, i) => i + 1);
  months: string[] = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  years: number[] = Array.from({ length: 10 }, (_, i) => new Date().getFullYear() + i);

  constructor() {}

  ngOnInit() {}

  uploadLogo() {
    // Handle logo upload
  }

  uploadProduct() {
    // Handle product image upload
  }

  onSubmit() {
    // Handle form submission
  }
}