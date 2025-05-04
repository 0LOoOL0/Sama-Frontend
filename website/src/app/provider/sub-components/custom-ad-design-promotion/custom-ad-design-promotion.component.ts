import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { ProviderAuthService } from '../../../services/provider-auth.service';
import { NavbarComponent } from '../../../user/sub-components/navbar/navbar.component';

@Component({
  selector: 'app-custom-ad-design-promotion',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule, NavbarComponent],
  templateUrl: './custom-ad-design-promotion.component.html',
  styleUrls: ['./custom-ad-design-promotion.component.css']
})
export class CustomAdDesignPromotionComponent {
  promotionForm: FormGroup;
  logoImage: File | null = null;
  businessImage: File | null = null;
  logoPreview: string | ArrayBuffer | null = null;
  businessPreview: string | ArrayBuffer | null = null;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router, private authService: ProviderAuthService) {
    this.promotionForm = this.fb.group({
      businessName: ['', Validators.required],
      adDescription: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^(\+973)?\d{8}$/)]],
      socialMedia: ['', Validators.required],
    
    });
  }

  onLogoImageSelected(event: any) {
    this.logoImage = event.target.files[0] as File;
    this.previewImage(this.logoImage, 'logo');
  }

  onBusinessImageSelected(event: any) {
    this.businessImage = event.target.files[0] as File;
    this.previewImage(this.businessImage, 'business');
  }

  previewImage(file: File, type: 'logo' | 'business') {
    const reader = new FileReader();
    reader.onload = () => {
      if (type === 'logo') {
        this.logoPreview = reader.result;
      } else {
        this.businessPreview = reader.result;
      }
    };
    reader.readAsDataURL(file);
  }

  onSubmit() {
    if (!this.authService.isLoggedIn()) {
      console.error('User is not logged in');
      // // Redirect to login page
      // this.router.navigate(['/provider-main/login']);
      return;
    }
    if (this.promotionForm.valid && this.logoImage && this.businessImage) {
      const formData = new FormData();
      formData.append('type', 'custom_ad_design');
      formData.append('logo_image', this.logoImage);
      formData.append('business_image', this.businessImage);
      Object.keys(this.promotionForm.controls).forEach(key => {
        formData.append(key, this.promotionForm.get(key)?.value);
      });
  
      // We'll use the interceptor to add the token, so we don't need to set headers here
      this.http.post(`${environment.apiUrl}/api/provider/promotions`, formData, { withCredentials: true }).subscribe(
        (response) => {
          console.log('Promotion created successfully', response);
          this.router.navigate(['/provider-main/check-out'], { queryParams: { adType: 'custom_ad_design' } });
        },
        (error) => {
          console.error('Error creating promotion', error);
        }
      );
    }
  }

  goBack() {
    this.router.navigate(['/provider-main/promotion']);
  }
}