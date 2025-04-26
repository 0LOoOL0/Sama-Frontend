import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { ProviderAuthService } from '../../../services/provider-auth.service';

@Component({
  selector: 'app-ready-to-launch-promotion',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './ready-to-launch-promotion.component.html',
  styleUrls: ['./ready-to-launch-promotion.component.css']
})
export class ReadyToLaunchPromotionComponent {
  promotionForm: FormGroup;
  selectedFile: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;

  constructor(
    private fb: FormBuilder, 
    private http: HttpClient, 
    private router: Router,
    private authService: ProviderAuthService
  ) {
    this.promotionForm = this.fb.group({
      adImage: [null, Validators.required]
    });
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    this.selectedFile = file;
    this.promotionForm.patchValue({ adImage: file });
    this.promotionForm.get('adImage')?.updateValueAndValidity();

    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(file);
  }

  onSubmit() {
    if (!this.authService.isLoggedIn()) {
      console.error('User is not logged in');
      return;
    }

    if (this.promotionForm.valid && this.selectedFile) {
      const formData = new FormData();
      formData.append('type', 'ready_to_launch');
      formData.append('ad_image', this.selectedFile);
  
      this.http.post(`${environment.apiUrl}/api/provider/promotions`, formData, { withCredentials: true }).subscribe(
        (response) => {
          console.log('Promotion created successfully', response);
          this.router.navigate(['/provider-main/check-out'], { queryParams: { adType: 'ready_to_launch' } });
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