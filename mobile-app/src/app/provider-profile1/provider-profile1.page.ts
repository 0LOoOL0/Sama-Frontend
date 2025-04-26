import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-provider-profile1',
  templateUrl: './provider-profile1.page.html',
  styleUrls: ['./provider-profile1.page.scss'],
})
export class ProviderProfile1Page implements OnInit {
  priceMode: string = 'beforeAfter';
  beforePrice: number | null = null;
  afterPrice: number | null = null;
  percentageChange: number | null = null;
  price: number | null = null;
  percentage: number | null = null;
  selectedImage1: string | ArrayBuffer | null = null;
  selectedImage2: string | ArrayBuffer | null = null;
  defaultImage: string = '../../assets/cam1.svg';
  image1SizeError: boolean = false;
  image2SizeError: boolean = false;
  percentageError: boolean = false;
  priceError: boolean = false; // Added error state for price validation
  petTypes = [
    { value: 'dog', label: 'Dog' },
    { value: 'cat', label: 'Cat' },
    { value: 'bird', label: 'Bird' },
    { value: 'hamster', label: 'Hamster' },
    { value: 'horse', label: 'Horse' },
    { value: 'other', label: 'Other' },
  ];

  constructor() {}

  ngOnInit() {}

  displayImage(event: Event, type: string): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const maxSizeInBytes = 2 * 1024 * 1024;

      if (file.size > maxSizeInBytes) {
        if (type === 'image1') {
          this.image1SizeError = true;
        } else if (type === 'image2') {
          this.image2SizeError = true;
        }
        return;
      } else {
        if (type === 'image1') {
          this.image1SizeError = false;
        } else if (type === 'image2') {
          this.image2SizeError = false;
        }
      }

      const reader = new FileReader();
      reader.onload = e => {
        if (type === 'image1') {
          this.selectedImage1 = e.target?.result ?? null;
        } else if (type === 'image2') {
          this.selectedImage2 = e.target?.result ?? null;
        }
      };
      reader.readAsDataURL(file);
    }
  }

  calculatePercentage() {
    if (this.beforePrice !== null && this.afterPrice !== null) {
      if (this.afterPrice >= this.beforePrice) {
        this.priceError = true; // Display error message
        this.percentageChange = null; // Clear percentage change
      } else {
        this.priceError = false;
        this.percentageChange =
          ((this.beforePrice - this.afterPrice) / this.beforePrice) * 100;
      }
    }
  }

  calculateAfterPrice() {
    if (
      this.price !== null &&
      this.percentage !== null &&
      this.price > 0 &&
      this.percentage >= 0
    ) {
      this.afterPrice = this.price - (this.price * this.percentage) / 100;
    } else {
      this.afterPrice = 0;
    }
  }

  validatePercentage() {
    if (
      this.percentage !== null &&
      (this.percentage < 0 || this.percentage > 100)
    ) {
      this.percentageError = true;
      this.percentage = null;
    } else {
      this.percentageError = false;
    }
  }
}
