import { ChangeDetectorRef, Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProviderAuthService } from '../../../services/provider-auth.service';
import { Provider, ProvidersService } from '../../../services/providers.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule, formatDate } from '@angular/common';
import { empty } from 'rxjs';
import { NavbarComponent } from '../../../user/sub-components/navbar/navbar.component';

@Component({
  selector: 'app-account-profile',
  standalone: true,
  imports: [NavbarComponent, CommonModule],
  templateUrl: './account-profile.component.html',
  styleUrl: './account-profile.component.css'
})
export class AccountProfileComponent {
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
  segment: string = 'profile';

   // Method to switch between 'login' and 'signup'
   changeSegment(segment: string) {
    this.segment = segment;
  }
  

  cr_record: string = '';

  formatTime(time: string): string {
    //{"from":"04:36","to":"19:14"}
    const [noneed1, tempH, tempM, teH, teM] = time.split(':');

    const [takeout,fromH] = tempH.split('\"');
    const [fromM] = tempM.split('\"');
    const [takeout2, toH] = teH.split('\"');
    const [toM] = teM.split('\"');

    //from
    const hourF = parseInt(fromH, 10);
    const minuteF = parseInt(fromM, 10);

    //to
    const hourT = parseInt(toH, 10);
    const minuteT = parseInt(toM, 10);

    //from
    const ampmF = hourF >= 12 ? 'pm' : 'am';
    const formattedHourF = hourF % 12 === 0 ? 12 : hourF % 12;

    //to
    const ampmT = hourT >= 12 ? 'pm' : 'am';
    const formattedHourT = hourT % 12 === 0 ? 12 : hourT % 12;
    //expected return H:M am/pm - H:M ap/pm
    return `${formattedHourF}:${this.padZero(minuteF)}${ampmF} - ${formattedHourT}:${this.padZero(minuteT)}${ampmT}`;
  }

  private padZero(num: number): string {
    return num < 10 ? `0${num}` : `${num}`;
  }

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: ProviderAuthService,
  ) {

  }


  async ngOnInit() {
    this.profileForm = this.formBuilder.group({
      
    });

    try {
      const resp = await this.authService.getProfile();
      this.profile = resp;
      console.log('Profile2:', this.profile);
      const format = 'dd/MM/yyyy';
      this.profile.created_at = formatDate(this.profile.created_at, format, 'en-US');
      const parsedData = JSON.parse(this.profile.documents);
      this.cr_record = parsedData.cr_record;
      console.log(this.cr_record);
      
    } catch (error) {
      console.error('Error fetching profile22 data:', error);
    }
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
