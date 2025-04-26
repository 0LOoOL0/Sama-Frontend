import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserAuthService } from '../../../services/user-auth.service';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
@Component({
  selector: 'app-create-owner-account',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NavbarComponent],
  templateUrl: './create-owner-account.component.html',
  styleUrl: './create-owner-account.component.css'
})
export class CreateOwnerAccountComponent {
  @ViewChild('ownerFileInput') ownerFileInput!: ElementRef<HTMLInputElement>;

  profileForm: FormGroup | any;
  selectedFile: File | null = null;
  profileImagePreview: string | ArrayBuffer | null = 'assets/mypet.svg';
  location = 0;
  isEditMode: boolean = false; // Flag to track mode
  petOwnerId!: number; // Property to store pet owner ID

  

  days: number[] = Array.from({ length: 31 }, (_, i) => i + 1);
  months: string[] = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  years: number[] = Array.from(
    { length: 100 },
    (_, i) => new Date().getFullYear() - i,
  );

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: UserAuthService,
    private http: HttpClient,
  ) { }

  ngOnInit() {
    this.profileForm = this.formBuilder.group({
      first_name: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(31),
          Validators.pattern('^[a-zA-Z]+$'),
        ],
      ],
      last_name: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(31),
          Validators.pattern('^[a-zA-Z]+$'),
        ],
      ],
      nationality: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      city: [
        '',
        [
          Validators.required,
          Validators.pattern('^[a-zA-Z]+$'),
          Validators.minLength(3),
          Validators.maxLength(31),
        ],
      ],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{8}$')]],
      // day: ['', [Validators.required]],
      // month: ['', [Validators.required]],
      // year: ['', [Validators.required]],
      // location: ['', [Validators.required]],
      // house: ['', [Validators.required]],
      dob: ['', [Validators.required]],
      road: ['', [Validators.required]],
      block: ['', [Validators.required]],
      building_name: ['', [Validators.required]],
      // apt_number: [''],
      // floor: [''],
      // company: [''],
      profile_image_base64: [''], // hidden, base64 string from file

    });

    // Call a method to load the existing profile data when editing
  this.loadExistingProfile();
  }

  loadExistingProfile() {
    this.authService.fetchProfileData()
      .then((profileData: any) => {
        this.isEditMode = true;
          this.petOwnerId = profileData.id;  // Save the pet owner ID
        // Patch the form with the existing user data
        this.profileForm.patchValue({
          first_name: profileData.first_name,
          last_name: profileData.last_name,
          nationality: profileData.nationality,
          gender: profileData.gender,
          city: profileData.city,
          phone: profileData.contactNumber,
          dob: profileData.date_of_birth, // ensure this is in a compatible format
          road: profileData.road,
          block: profileData.block,
          building_name: profileData.building,
          // Patch other fields as needed
        });

        if (profileData.imageUrl) {
          this.profileImagePreview = profileData.imageUrl;
        }
      })
      .catch(error => {
        console.error('Error loading user profile:', error);
      });

      
      
  }

  showHome() {
    this.location = 0;
    this.profileForm.patchValue({
      location: 'House',
      house: '',
      road: '',
      block: '',
      building_name: '',
      apt_number: '',
      floor: '',
      company: '',
    });
  }

  showAppartment() {
    this.location = 1;
    this.profileForm.patchValue({
      location: 'Appartment',
      house: '',
      road: '',
      block: '',
      building_name: '',
      apt_number: '',
      floor: '',
      company: '',
    });
  }

  showOffice() {
    this.location = 2;
    this.profileForm.patchValue({
      location: 'Office',
      house: '',
      road: '',
      block: '',
      building_name: '',
      apt_number: '',
      floor: '',
      company: '',
    });
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.profileImagePreview = reader.result;
        this.selectedFile = file;
  
        // Save base64 string to append to form later
        if (typeof reader.result === 'string') {
          this.profileForm.patchValue({
            profile_image_base64: reader.result
          });
        }
      };
      reader.readAsDataURL(file);
    }
  }
  
  onMonthOrYearChange() {
    const month = this.profileForm.get('month').value;
    const year = this.profileForm.get('year').value;
    this.updateDays(month, year);
  }

  triggerOwnerImageUpload(): void {
    this.ownerFileInput.nativeElement.click();
  }
  

  updateDays(month: string, year: number) {
    if (month === 'February') {
      // February: Check for leap year
      const isLeapYear =
        (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
      this.days = Array.from({ length: isLeapYear ? 29 : 28 }, (_, i) => i + 1);
    } else if (['April', 'June', 'September', 'November'].includes(month)) {
      // April, June, September, November: 30 days
      this.days = Array.from({ length: 30 }, (_, i) => i + 1);
    } else {
      // All other months: 31 days
      this.days = Array.from({ length: 31 }, (_, i) => i + 1);
    }
  }

  async completeProfile() {
    console.log('Attempting to complete profile');
    Object.keys(this.profileForm.controls).forEach((key) => {
      const control = this.profileForm.get(key);
      console.log(`${key} - Value:`, control?.value, 'Errors:', control?.errors);
    });
    if (this.profileForm.invalid) { // removed this  in conditon }} !this.selectedFile 
      console.error('Form is invalid or no file selected');
      return;
    }

    const email = localStorage.getItem('email');
    const password = localStorage.getItem('password');

    if (!email || !password) {
      console.error('Email or password is missing');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('first_name', this.profileForm.get('first_name').value);
      formData.append('last_name', this.profileForm.get('last_name').value);
      formData.append('phone', this.profileForm.get('phone').value);
      formData.append('nationality', this.profileForm.get('nationality').value);
      formData.append('city', this.profileForm.get('city').value);
      formData.append('gender', this.profileForm.get('gender').value);
      // Use the existing dob control directly:
formData.append('date_of_birth', this.profileForm.get('dob').value);


formData.append('location', this.profileForm.get('location')?.value || '');
formData.append('house', this.profileForm.get('house')?.value || '');
      formData.append('road', this.profileForm.get('road').value);
      formData.append('block', this.profileForm.get('block').value);
      formData.append('building', this.profileForm.get('building_name').value);

      formData.append('apt_number', this.profileForm.get('apt_number')?.value || '');
formData.append('floor', this.profileForm.get('floor')?.value || '');
formData.append('company', this.profileForm.get('company')?.value || '');
      //formData.append('profile_image', this.selectedFile);
      if (!this.isEditMode) {
        formData.append('email', email);
        formData.append('password', password);
      }
      // Log each key-value pair
      formData.forEach((value, key) => {
        console.log(`${key}: ${value}`);
      });
      formData.append('status', 'active'); // or get it from your form if available
// Append the method override
formData.append('_method', 'PUT');
formData.append('profile_image', this.profileForm.get('profile_image_base64').value);



      // Condition: if in edit mode, update; otherwise register new user.
      if (this.isEditMode) {
        console.log('Calling updateProfile with petOwnerId:', this.petOwnerId);
        await this.authService.updateProfile(formData, this.petOwnerId);
      } else {
        console.log('Calling register endpoint.');
        await this.authService.register(formData);
      }
      // Navigate after successful update or registration.
      this.router.navigate(['user-main-component/create-pet-profile']);
    } catch (error: any) {
      this.handleError(error);
    }
  }

  private handleError(error: any) {
    if (error.response && error.response.data) {
      const validationErrors = error.response.data.errors;
      for (const field in validationErrors) {
        const messages = validationErrors[field];
        console.error(`Validation error for ${field}: ${messages.join(', ')}`);
      }
    } else {
      console.error('An error occurred:', error.message);
    }
  }
  navigatePetProfile() {
    this.router.navigate(['user-main-component/create-pet-profile']);
  }
}