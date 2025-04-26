import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { phoneLandscape } from 'ionicons/icons';

@Component({
  selector: 'app-profile-setup',
  templateUrl: './profile-setup.page.html',
  styleUrls: ['./profile-setup.page.scss'],
})
export class ProfileSetupPage implements OnInit {
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
    private authService: AuthService,
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
      day: ['', [Validators.required]],
      month: ['', [Validators.required]],
      year: ['', [Validators.required]],
      location: ['', [Validators.required]],
      house: [''],
      road: [''],
      block: [''],
      building_name: [''],
      apt_number: [''],
      floor: [''],
      company: [''],
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
    console.log(this.profileForm);
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
    if (this.profileForm.invalid) {
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
      if (this.selectedFile) {
        formData.append('profile_image', this.selectedFile);
      } else {
        formData.append('profile_image', ''); // Append 'null' explicitly
      }
      formData.append('email', email);
      formData.append('password', password);

      const response = await this.authService.register(formData);
      console.log(response.data);

      this.router.navigate(['./add-pets']);
    } catch (error: any) {
      console.error(error.response.data);
    }
  }
}
