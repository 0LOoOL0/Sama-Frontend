import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-custom-ad',
  templateUrl: './custom-ad.page.html',
  styleUrls: ['./custom-ad.page.scss'],
})
export class CustomAdPage {
  adForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.adForm = this.fb.group({
      businessName: ['', Validators.required],
      adDescription: ['', Validators.required],
      contactNumber: ['', Validators.required],
      websiteLink: [''],
      instagramLink: [''],
      emailLink: [''],
      otherLinks: [''],
      logoImage: [null, Validators.required],
      productImages: [[], Validators.required]
    });
  }

  onFileChange(event: Event, field: string) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      if (field === 'logoImage') {
        this.adForm.patchValue({ logoImage: input.files[0] });
      } else if (field === 'productImages') {
        this.adForm.patchValue({ productImages: Array.from(input.files) });
      }
    }
  }

  onSubmit() {
    if (this.adForm.valid) {
      const formData = new FormData();
      formData.append('businessName', this.adForm.get('businessName')?.value);
      formData.append('adDescription', this.adForm.get('adDescription')?.value);
      formData.append('contactNumber', this.adForm.get('contactNumber')?.value);
      formData.append('websiteLink', this.adForm.get('websiteLink')?.value);
      formData.append('instagramLink', this.adForm.get('instagramLink')?.value);
      formData.append('emailLink', this.adForm.get('emailLink')?.value);
      formData.append('otherLinks', this.adForm.get('otherLinks')?.value);
      formData.append('logoImage', this.adForm.get('logoImage')?.value);
      const productImages = this.adForm.get('productImages')?.value;
      productImages.forEach((file: File, index: number) => {
        formData.append(`productImages[${index}]`, file);
      });

      // Implement your upload logic here

      console.log('Form submitted successfully with data:', formData);
    } else {
      console.log('Form is invalid');
    }
  }
}
