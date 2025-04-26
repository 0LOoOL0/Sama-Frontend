import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule,FormArray } from '@angular/forms';
import { ProviderAuthService } from '../../../services/provider-auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SignupStepsComponent } from '../../../shared/signup-steps/signup-steps.component';

@Component({
  selector: 'app-wait-for-approval2',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SignupStepsComponent],
  templateUrl: './wait-for-approval2.component.html',
  styleUrls: ['./wait-for-approval2.component.css']
})
export class WaitForApproval2Component implements OnInit {
  profileForm: FormGroup;
  selectedProviderType: string = '';
  veterinarians: FormArray;
  selectedDays: string[] = [];
  pg:number = 3;

  constructor(
    private fb: FormBuilder,
    private providerAuthService: ProviderAuthService,
    private router: Router
  ) {
    this.profileForm = this.fb.group({
      profile_image: [''],
      availability: [[]],
      timing: this.fb.group({
        from: ['', Validators.required],
        to: ['', Validators.required]
      }),     
      social_media: this.fb.group({
        website: [''],
        instagram: [''],
        other: ['']
      }),
      documents: this.fb.group({
        business_contract: [null],
        registration_certificate: [null]
      }),
    });
    
    
    this.veterinarians = this.profileForm.get('veterinarians') as FormArray;
  }

  ngOnInit(): void {
    // Listen to businessType changes
    this.profileForm.get('businessType')?.valueChanges.subscribe((type) => {
      this.selectedProviderType = type;
    });
    this.addVeterinarian(); // Optionally add a veterinarian field by default
  }

  onBusinessTypeChange(type: string): void {
    this.selectedProviderType = type;
    this.profileForm.get('businessType')?.setValue(type);
  }

  // Toggle the day selection
  toggleDay(day: string): void {
    const availability = this.profileForm.get('availability')?.value || [];
    if (availability.includes(day)) {
      // Remove the day from array
      this.profileForm.get('availability')?.setValue(availability.filter((d: string) => d !== day));
    } else {
      // Add the day to the array
      this.profileForm.get('availability')?.setValue([...availability, day]);
    }
  }
  

// Check if a day is selected
isDaySelected(day: string): boolean {
  return this.selectedDays.includes(day);
}


  // Add Veterinarian Form Group
  addVeterinarian(): void {
    const vetGroup = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      bio: [''],
      education: [''],
      years_of_experience: [''],
      specialization: [''],
      picture: ['']
    });
    //this.veterinarians.push(vetGroup);
  }

  // Remove a veterinarian field
  removeVeterinarian(index: number): void {
    this.veterinarians.removeAt(index);
  }

// Handle file change
onFileChange(event: any, index: number | string = 'profile_image'): void {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e: any) => {
    const previewUrl = e.target.result;
    
    if (typeof index === 'number') {
      // File is for a veterinarian picture
      const veterinariansArray = this.profileForm.get('veterinarians') as FormArray;
      const veterinarianGroup = veterinariansArray.at(index) as FormGroup;
      veterinarianGroup.patchValue({ picture: file, previewUrl });
    } else {
      // File is for profile image or other document
      this.profileForm.patchValue({ [index]: file, previewUrl });
    }
  };

  reader.readAsDataURL(file);
}

  async getToken(){
    return await this.providerAuthService.getCSRFToken();
  }



  // Handle form submission
  // Handle form submission
onSubmit(): void {
  // if (this.profileForm.invalid) {
  //   console.log("Form is invalid. Checking each control:");

  //   Object.keys(this.profileForm.controls).forEach((key) => {
  //     const control = this.profileForm.get(key);
  //     console.log(`${key} - Value:`, control?.value, 'Errors:', control?.errors);
  //   });

  //   return;
  // }

  console.log("Form is valid, proceeding with submission...");

  const formData = new FormData();
  const profileData = this.profileForm.value;

  Object.keys(this.profileForm.controls).forEach((key) => {
    const control = this.profileForm.get(key);
    console.log(`${key} - Value: `, control?.value, 'Errors: ', control?.errors);
  });
  
  // Append businessType and other fields
  formData.append('businessType', profileData.businessType);
  formData.append('availability', JSON.stringify(this.selectedDays)); // Using selected days array directly
  formData.append('timing_from', profileData.timing_from);
  formData.append('timing_to', profileData.timing_to);
  formData.append('social_media', JSON.stringify(profileData.social_media));
  const tt = this.getToken().toString();
  if(tt){
    formData.append('token', tt);
  }

  // Append business contract and registration certificate
  if (profileData.documents.business_contract) {
    formData.append('business_contract', profileData.documents.business_contract);
  }
  if (profileData.documents.registration_certificate) {
    formData.append('registration_certificate', profileData.documents.registration_certificate);
  }

  // Append conditional fields for doctor or trainer
  if (profileData.businessType === 'doctor' || profileData.businessType === 'trainer') {
    formData.append('years_of_experience', profileData.years_of_experience);
    formData.append('medical_degree_and_specialization', profileData.medical_degree_and_specialization);
  }

  // Append veterinarian details for vetClinic
  if (profileData.businessType === 'vetClinic') {
    profileData.veterinarians.forEach((vet: any, index: number) => {  // Explicit types added here
      formData.append(`veterinarians[${index}][name]`, vet.name);
      formData.append(`veterinarians[${index}][email]`, vet.email);
      formData.append(`veterinarians[${index}][bio]`, vet.bio);
      formData.append(`veterinarians[${index}][education]`, vet.education);
      formData.append(`veterinarians[${index}][years_of_experience]`, vet.years_of_experience);
      formData.append(`veterinarians[${index}][specialization]`, vet.specialization);
      if (vet.picture) {
        formData.append(`veterinarians[${index}][picture]`, vet.picture);
      }
    });
  }

  this.providerAuthService.Registration(formData)
  .then((response: any) => {
    console.log('Profile completed successfully', response);
    this.router.navigate(['/success']);
  })
  .catch((error: any) => {
    console.error('Profile submission failed', error);
  });

}

  
}