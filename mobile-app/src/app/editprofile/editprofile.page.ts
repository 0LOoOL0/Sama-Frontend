import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.page.html',
  styleUrls: ['./editprofile.page.scss'],
})
export class EditprofilePage implements OnInit {
  profile: any = {};
  profileForm: FormGroup | any;
  selectedFile: File | null = null;
  profileImagePreview: string | ArrayBuffer | null = this.profile.profile_image;
  location: number | null = null;
  formError: string = '';
  days: number[] = Array.from({ length: 31 }, (_, i) => i + 1);
  months: number[] = Array.from({ length: 12 }, (_, i) => i + 1);
  years: number[] = Array.from(
    { length: 100 },
    (_, i) => new Date().getFullYear() - i,
  );

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
  ) {}

  async ngOnInit() {
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
      phone: ['', [Validators.required, Validators.pattern('^[0-9-]+$')]],
      day: ['', [Validators.required]],
      month: ['', [Validators.required]],
      year: ['', [Validators.required]],
      location: ['', [Validators.required]],
      house: [''],
      road: [''],
      city: [
        '',
        [
          Validators.required,
          Validators.pattern('^[a-zA-Z\\s]+$'),
          Validators.minLength(3),
          Validators.maxLength(31),
        ],
      ],
      gender: ['', [Validators.required]],
      block: ['', [Validators.required]],
      building_name: [''],
      apt_number: [''],
      floor: [''],
      company: [''],
    });

    try {
      this.profile = await this.authService.fetchProfileData();
      console.log('Profile:', this.profile);

      if (this.profile.location == 'house') {
        this.showHome();
      } else if (this.profile.location == 'apartment') {
        this.showAppartment();
      } else if (this.profile.location == 'office') {
        this.showOffice();
      }

      const [year, month, day] = this.profile.date_of_birth
        .split('-')
        .map(Number);

      this.profileForm.patchValue({
        first_name: this.profile.first_name,
        last_name: this.profile.last_name,
        nationality: this.profile.nationality,
        phone: this.profile.phone,
        day: day,
        month: month,
        year: year,
        city: this.profile.city || '',
        gender: this.profile.gender,
        location: this.profile.location,
        house: this.profile.house || '',
        road: this.profile.road || '',
        block: this.profile.block || '',
        building_name: this.profile.building_name || '',
        apt_number: this.profile.apt_number || '',
        floor: this.profile.floor || '',
        company: this.profile.company || '',
      });
    } catch (error) {
      console.error('Error fetching profile data:', error);
    }
  }

  showHome() {
    this.location = 0;
    this.profileForm.patchValue({
      location: 'house',
      house: this.profile.house || '',
      road: '',
      block: '',
      city: this.profile.city || '',
      building_name: '',
      apt_number: '',
      floor: '',
      company: '',
    });
  }

  showAppartment() {
    this.location = 1;
    this.profileForm.patchValue({
      location: 'apartment',
      house: '',
      city: this.profile.city || '',
      road: this.profile.road || '',
      block: this.profile.block || '',
      building_name: this.profile.building_name || '',
      apt_number: this.profile.apt_number || '',
      floor: this.profile.floor || '',
      company: '',
    });
  }

  showOffice() {
    this.location = 2;
    this.profileForm.patchValue({
      location: 'office',
      house: '',
      city: this.profile.city || '',
      road: this.profile.road || '',
      block: this.profile.block || '',
      building_name: this.profile.building_name || '',
      apt_number: '',
      floor: this.profile.floor || '',
      company: this.profile.company || '',
    });
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;

      const reader = new FileReader();
      reader.onload = () => {
        this.profileImagePreview = reader.result;
        this.profileForm.updateValueAndValidity();
      };
      reader.readAsDataURL(file);
    }
  }
  onMonthOrYearChange() {
    const month = this.profileForm.get('month').value;
    const year = this.profileForm.get('year').value;
    this.updateDays(month, year);
  }

  updateDays(month: number, year: number) {
    if (month === 2) {
      // February: Check for leap year
      const isLeapYear =
        (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
      this.days = Array.from({ length: isLeapYear ? 29 : 28 }, (_, i) => i + 1);
    } else if ([4, 6, 9, 11].includes(month)) {
      // April, June, September, November: 30 days
      this.days = Array.from({ length: 30 }, (_, i) => i + 1);
    } else {
      // All other months: 31 days
      this.days = Array.from({ length: 31 }, (_, i) => i + 1);
    }
    this.profileForm.controls['day'].updateValueAndValidity();
  }

  async updateProfile() {
    console.log('Form Status:', this.profileForm.status);
  console.log('Form Values:', this.profileForm.value);
  console.log('Form Errors:', this.profileForm.errors);
    if (this.profileForm.invalid) {
      console.log('Invalid Fields:', Object.keys(this.profileForm.controls).filter(key => this.profileForm.controls[key].invalid));
      this.formError = 'Please fill in all the required fields.';
      return;
    }

    const formData = this.profileForm.value;
    const date_of_birth = `${formData.year}-${formData.month}-${formData.day}`;

    const data = {
      ...formData,
      date_of_birth,
      profile_image: this.profileImagePreview || this.profile.profile_image,
    };
    try {
      await this.authService.updateProfile(data, this.profile.id);
      console.log('Profile updated successfully');
      if (this.selectedFile) {
        const formData = new FormData();
        formData.append('profile_image', this.selectedFile);
        await this.authService.updateProfileImage(formData, this.profile.id);
      }
      this.router.navigate(['/my']).then(() => {
        window.location.reload();
      });
    } catch (error: any) {
      console.error('Error updating profile:', error);
      if (error.response) {
        console.error('Server response:', error.response.data);
      }
    }
     
  }
}
