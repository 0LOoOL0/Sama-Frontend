import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
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
  profileForm: FormGroup | any;
  selectedFile: File | null = null;
  profileImagePreview: string | ArrayBuffer | null = 'assets/mypet.svg';
  location = 0;

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
  ) {}

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

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;

      const reader = new FileReader();
      reader.onload = () => {
        this.profileImagePreview = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }
  onMonthOrYearChange() {
    const month = this.profileForm.get('month').value;
    const year = this.profileForm.get('year').value;
    this.updateDays(month, year);
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
    if (this.profileForm.invalid || !this.selectedFile) {
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
      const day = this.profileForm.get('day').value;
      const month = this.profileForm.get('month').value;
      const year = this.profileForm.get('year').value;
      const date_of_birth = `${year}-${(
        '0' +
        (this.months.indexOf(month) + 1)
      ).slice(-2)}-${('0' + day).slice(-2)}`;
      formData.append('date_of_birth', date_of_birth);

      formData.append('location', this.profileForm.get('location').value);
      formData.append('house', this.profileForm.get('house').value);
      formData.append('road', this.profileForm.get('road').value);
      formData.append('block', this.profileForm.get('block').value);
      formData.append(
        'building_name',
        this.profileForm.get('building_name').value,
      );
      formData.append('apt_number', this.profileForm.get('apt_number').value);
      formData.append('floor', this.profileForm.get('floor').value);
      formData.append('company', this.profileForm.get('company').value);
      formData.append('profile_image', this.selectedFile);
      formData.append('email', email);
      formData.append('password', password);
      // Log each key-value pair
formData.forEach((value, key) => {
  console.log(`${key}: ${value}`);
});

await this.authService.register(formData);
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
}}