import { Component, OnInit } from '@angular/core';
import { ProviderAuthService } from '../../services/provider-auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SignupStepsComponent } from '../../shared/signup-steps/signup-steps.component';

@Component({
  selector: 'app-sign-up-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SignupStepsComponent], 
  templateUrl: './sign-up-form.component.html',
  styleUrls: ['./sign-up-form.component.scss']
})
export class SignUpFormComponent implements OnInit {
  profileForm: FormGroup;
  selectedProviderType: string = '';
  addressType: string = "House";
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private providerAuthService: ProviderAuthService,
    private router: Router
  ) {
    this.profileForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(64)]],
      businessType: ['', Validators.required],
      contact_no: ['', [Validators.required, Validators.pattern(/^\d{8}$/)]],
      address: this.fb.group({
        house: [''],
        road: [''],
        block: [''],
        area: ['']
      }),
      years_of_experience: [''],
      medical_degree_and_specialization: [''],
      trainer_experience: [''],
    });
  }

  ngOnInit(): void {}

  onBusinessTypeChange(type: string): void {
    this.selectedProviderType = type;
    this.profileForm.get('businessType')?.setValue(type);
  }

  adressType(tp: string){
    this.addressType = tp;
  }

  async onSubmit(): Promise<void> {
    if (this.profileForm.invalid) {
      console.log("Form is invalid. Checking each control:");
      Object.keys(this.profileForm.controls).forEach((key) => {
        const control = this.profileForm.get(key);
        console.log(`${key} - Value:`, control?.value, 'Errors:', control?.errors);
      });
      this.errorMessage = 'Please fill all required fields correctly.';
      return;
    }

    const email = localStorage.getItem('email');
    const password = localStorage.getItem('password');

    if (!email || !password) {
      console.error('Email or password not found in local storage.');
      this.errorMessage = 'Email or password not found. Please try logging in again.';
      return;
    }

    console.log("Form is valid, proceeding with submission...");

    const formData = new FormData();
    const profileData = this.profileForm.value;
    const addr = `${this.addressType} ${profileData.address.house}, Road ${profileData.address.road}, Block ${profileData.address.block}, Area ${profileData.address.area}`;

    formData.append('type', profileData.businessType);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('address', addr);
    formData.append('contact_no', profileData.contact_no);
    formData.append('name', profileData.name);

    if (profileData.businessType === 'doctor' || profileData.businessType === 'trainer') {
      formData.append('years_of_experience', profileData.years_of_experience);
      formData.append('medical_degree_and_specialization', profileData.medical_degree_and_specialization);
    }

    try {
      const response = await this.providerAuthService.registerPendingProvider(formData);
      console.log('Profile completed successfully', response);
      this.router.navigate(['./wait-approval']);
    } catch (error: any) {
      console.error('Profile submission failed', error);
      if (error.response && error.response.data && error.response.data.errors) {
        const errorMessages = Object.values(error.response.data.errors).flat();
        this.errorMessage = errorMessages.join(' ');
      } else {
        this.errorMessage = error.message || 'An unexpected error occurred. Please try again later.';
      }
    }
  }
}