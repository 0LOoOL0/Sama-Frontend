import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  FormArray,
} from '@angular/forms';
import { ProviderSectionService } from '../service/provider-section.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-provider-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './provider-profile.component.html',
  styleUrls: ['./provider-profile.component.css'],
})
export class ProviderProfileComponent {
  profileForm: FormGroup;
  isSidebarVisible = true;
  isFillVisible = false;
  imagePreview: string | null = null; 
  selectedProvider: any = {};
  providerId: any;
  hasProfileData: boolean = false;

  constructor(
    private fb: FormBuilder,
    private profileService: ProviderSectionService,
    private toastr: ToastrService
  ) {
    this.profileForm = this.fb.group({
      authorizedPerson: this.fb.array([this.createAuthorizedPerson()]),

      toggle: [false],
      providerType: [''],
      profile_image: [''],

      businessName: [''],
      phoneNumber: [''],
      startDate: [''],
      endDate: [''],
      companyEmail: [''],
      website: [''],
      providerNameEn: [''],
      providerNameAr: [''],
      crNumber: [''],
      instagramUrl: [''],
      address: this.fb.group({
        office: [''],
        road: [''],
        block: [''],
        city: [''],
      }),
      availabilityDays: [[]],
      availabilityHours: this.fb.group({
        start: [''],
        end: [''],
      }),
    });
  }

  get authorizedPerson(): FormArray {
    return this.profileForm.get('authorizedPerson') as FormArray;
  }

  createAuthorizedPerson(): FormGroup {
    return this.fb.group({
      name: [''],
      position: [''],
      contactNumber: [''],
      email: [''],
    });
  }

  addAuthorizedPerson(): void {
    this.authorizedPerson.push(this.createAuthorizedPerson());
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];

    if (file) {
      const fileType = file.type;

      if (
        fileType === 'image/png' ||
        fileType === 'image/jpeg' ||
        fileType === 'image/jpg'
      ) {
        const reader = new FileReader();

        reader.onload = (e: any) => {
          this.imagePreview = e.target.result;

          this.profileForm.patchValue({
            profile_image: file,
          });
        };

        reader.readAsDataURL(file);
      } else {
        this.toastr.warning(
          'Please select a valid image file (PNG, JPG, JPEG).',
          'Try Again!',
          {
            timeOut: 3000,
          }
        );
      }
    }
  }

  onSubmit() {
    if (this.profileForm.valid) {
      const formData = new FormData();

      formData.append(
        'profile_image',
        this.profileForm.get('profile_image')?.value
      );

      const profileData = { ...this.profileForm.value };
      formData.append('providerData', JSON.stringify(profileData));
      const loader = document.getElementById('loader');

      if (!loader) {
        return;
      }    
      loader.style.display = 'block';

      this.profileService.AddProvider(formData).subscribe(
        (response) => {
          loader.style.display = 'none';

          this.toastr.success(
            'Profile submitted successfully!',
            'Congratulations!',
            {
              timeOut: 3000,
            }
          );
          const providerData = {
            profileId: response.provider.id,
            contact: response.provider.contact_no,
          };
          this.profileService.setProviderId(providerData.profileId);
        },
        (error) => {
          console.log(error);  // Check what the full error object looks like.
          this.toastr.error(
            'The provider email or phone number already exists.',
            'Try Again!',
            {
              timeOut: 3000,
            }
          );
        }
      );
    } else {
      this.toastr.error(
        'Please ensure the form is correctly filled.',
        'Try Again!',
        {
          timeOut: 3000,
        }
      );
    }
  }
  ngOnInit(): void {
    const navigation = window.history.state;

    if (navigation && navigation.provider) {
      this.selectedProvider = navigation.provider;

      this.selectedProvider.address = this.selectedProvider.address || {
        office: '',
        road: '',
        block: '',
        city: '',
      };
      this.selectedProvider.availabilityDays =
        this.selectedProvider.availabilityDays || [];
      this.populateForm(this.selectedProvider);
    }
  }

  populateForm(provider: any): void {
    this.hasProfileData = true;

    this.imagePreview = provider?.profile_image || 'assets/images/profile.png';
    this.profileForm.patchValue({
      businessName: provider?.name || '',
      phoneNumber: provider?.contact_no || '',
      companyEmail: provider?.email || '',
      providerNameEn: provider?.provider_name_en || '',
      providerNameAr: provider?.provider_name_ar || '',
      crNumber: provider?.cr_number || '',
      instagramUrl: provider?.instagram || '',
      website: provider?.website || '',
      startDate: provider?.start_date || '',
      endDate: provider?.end_date || '',
      address: {
        office: provider?.address?.office || provider?.office || '',
        road: provider?.address?.road || provider?.road || '',
        block: provider?.address?.block || provider?.block || '',
        city: provider?.address?.city || provider?.city || '',
      },
      availabilityDays: this.parseJson(provider?.availability_days) || [],
      availabilityHours: {
        start: this.parseJson(provider?.availability_hours)?.start || '',
        end: this.parseJson(provider?.availability_hours)?.end || '',
      },
    });

    const authorizedPersons =
      this.parseJson(provider?.authorized_persons) || [];
    this.setAuthorizedPersons(authorizedPersons);
    console.log('this is image profile', this.imagePreview);

    console.log(this.profileForm.value);
  }

  setAuthorizedPersons(authorizedPersons: any[]): void {
    const authorizedPersonArray = this.profileForm.get(
      'authorizedPerson'
    ) as FormArray;

    authorizedPersonArray.clear();

    authorizedPersons.forEach((person) => {
      authorizedPersonArray.push(
        this.fb.group({
          name: person.name || '',
          position: person.position || '',
          contactNumber: person.contactNumber || '',
          email: person.email || '',
        })
      );
    });
  }

  toggleAvailabilityDay(day: string) {
    const days = this.profileForm.get('availabilityDays')?.value || [];
    if (days.includes(day)) {
      this.profileForm
        .get('availabilityDays')
        ?.setValue(days.filter((d: string) => d !== day));
    } else {
      this.profileForm.get('availabilityDays')?.setValue([...days, day]);
    }
  }
  private parseJson(jsonString: string): any {
    try {
      return JSON.parse(jsonString);
    } catch (error) {
      return null;
    }
  }
  toggleSidebar() {
    this.isSidebarVisible = !this.isSidebarVisible;
  }

  generateUniqueId(): string {
    return `id-${Date.now()}`;
  }

  updateProvider(): void {
    if (this.profileForm.valid) {
      
      const formData = this.profileForm.value;

      this.providerId = this.profileService.getProviderId();

      if (!this.providerId) {
        this.toastr.warning(
          'Provider profile not found. Please submit a profile first.',
          'Try Again!',
          {
            timeOut: 3000,
          }
        );
        return;
      }

      let base64Image = '';
      const profileImage = formData.profile_image;

      if (profileImage instanceof File) {
        this.convertToBase64(profileImage)
          .then((base64: string) => {
            base64Image = base64;
            this.sendProviderData(base64Image, formData);
          })
          .catch((error) => {
            this.toastr.warning('Chose another profile image', 'Try Again!', {
              timeOut: 3000,
            });
          });
      } else {
        this.sendProviderData(base64Image, formData);
      }
    } else {
      this.toastr.warning('Please fill out the form correctly.', 'Try Again!', {
        timeOut: 3000,
      });
    }
  }

  convertToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result as string);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  sendProviderData(base64Image: string, formData: any): void {
    console.log('Provider ID:', this.providerId);
    console.log('Form Data:', formData);

    const providerData = {
      ...formData,
      profile_image: base64Image || formData.profile_image,
    };

    const requestBody = {
      providerData: JSON.stringify(providerData),
    };
    const loader = document.getElementById('loader');

    if (!loader) {
      return;
    }    
    loader.style.display = 'block';

    this.profileService.updateProvider(this.providerId, requestBody).subscribe(
      (response) => {
        loader.style.display = 'none';

        this.toastr.success('Provider updated successfully!', 'Congratulations!', {
          timeOut: 3000,
        });
        console.log('Final providerData:', providerData);
        this.profileForm.reset();
      },
      (error) => {
        this.toastr.warning('Provider has not been updated!', 'Try Again!', {
          timeOut: 3000,
        });
      }
    );
  }
}
