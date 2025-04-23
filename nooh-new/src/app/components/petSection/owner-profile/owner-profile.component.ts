import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { PetSectionService } from '../service/PetSectionServices';
import { Router } from '@angular/router';

@Component({
  selector: 'app-owner-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './owner-profile.component.html',
  styleUrls: ['./owner-profile.component.css'],
})
export class OwnerProfileComponent implements OnInit {
  ownerData: any;  // Holds the owner details including pets
  ownerForm: FormGroup;
  profileImageFile: File | null = null;
  profileImageFileName: string = 'No file chosen';
  profileImageBase64: string | null = null;
  isEditMode = false;

  // Pet counts
  memberCount: number = 0;
  nonMemberCount: number = 0;
  freeTrialCount: number = 0;

  // Array to store selected pets for invoice printing
  selectedPets: any[] = [];
  ownerOrders: any[] = [];


  @ViewChild('fileInput') fileInput!: ElementRef;

  constructor(
    private fb: FormBuilder,
    private petSectionService: PetSectionService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.ownerForm = this.fb.group({
      first_name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(31), Validators.pattern('^[A-Za-z]+$')]],
      last_name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(31), Validators.pattern('^[A-Za-z]+$')]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      gender: ['', Validators.required],
      nationality: ['', Validators.required],
      date_of_birth: ['', Validators.required],
      phone: ['', Validators.required],
      city: ['', Validators.required],
      road: [''],
      block: [''],
      status: ['Non-active', Validators.required],
      building: [''],
      isActive: [false],
    });
  }

  ngOnInit(): void {
    const state = window.history.state;
    console.log('Owner edit state:', state);
    if (state && state.ownerData) {
      this.isEditMode = true;
      this.populateForm(state.ownerData);
      this.petSectionService.setOwnerId(state.ownerData.id);
      this.ownerForm.get('password')?.clearValidators();
      this.ownerForm.get('password')?.updateValueAndValidity();
      this.ownerForm.get('isActive')?.valueChanges.subscribe((isActive: boolean) => {
        this.ownerForm.get('status')?.setValue(isActive ? 'Active' : 'Non-active');
      });
    }

    const ownerId = this.petSectionService.getOwnerId();
    if (ownerId) {
      this.petSectionService.getOwner(ownerId).subscribe(
        (response: any) => {
          const owner = response.data ? response.data : response;
          this.ownerData = owner;
          this.populateForm(owner);
          if (owner && owner.pets) {
            this.memberCount = owner.pets.filter((pet: any) => pet.membership && pet.membership.status !== 'Free trial').length;
            this.freeTrialCount = owner.pets.filter((pet: any) => pet.membership && pet.membership.status === 'Free trial').length;
            this.nonMemberCount = owner.pets.filter((pet: any) => !pet.membership).length;
          }
        },
        (error: any) => {
          console.error('Error loading owner details:', error);
        }
      );

      if (ownerId) {
        this.petSectionService.getOwnerOrders(ownerId).subscribe(
          (orders: any[]) => {
            this.ownerOrders = orders;
            console.log('Owner orders:', this.ownerOrders);
          },
          (error: any) => {
            console.error('Error fetching orders:', error);
          }
        );
      }
    }
  }
  
  editPet(pet: any): void {
    this.router.navigate(['/add-pet'], { state: { petData: pet } });
  }
  
  populateForm(owner: any): void {
    this.ownerForm.patchValue({
      first_name: owner.first_name || (owner.ownerName ? owner.ownerName.split(' ')[0] : ''),
      last_name: owner.last_name || (owner.ownerName ? owner.ownerName.split(' ')[1] : ''),
      email: owner.email,
      phone: owner.contactNumber || owner.phone,
      nationality: owner.nationality,
      gender: owner.gender,
      date_of_birth: owner.date_of_birth,
      city: owner.city,
      house: owner.house,
      road: owner.road,
      block: owner.block,
      status: owner.status,
      isActive: owner.status === 'Active',
      building: owner.building
    });
    this.profileImageBase64 = owner.imageUrl;
    this.profileImageFileName = owner.imageUrl ? 'Existing Image' : 'No file chosen';
  }

  onProfileImageSelect(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg'];
      if (!allowedTypes.includes(file.type)) {
        this.toastr.error('Invalid file type. Only PNG, JPG, or JPEG are allowed.', 'Error', { timeOut: 3000 });
        this.profileImageFile = null;
        this.profileImageFileName = 'No file chosen';
        return;
      }
      this.profileImageFile = file;
      this.profileImageFileName = file.name;
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        if (e.target && e.target.result) {
          this.profileImageBase64 = e.target.result as string;
          console.log('New image Base64:', this.profileImageBase64);
        }
      };
      reader.readAsDataURL(file);
    }
  }

  triggerFileInput(): void {
    this.fileInput.nativeElement.click();
  }

  onSubmit(): void {
    if (this.ownerForm.valid) {
      const formData = {
        ...this.ownerForm.value,
        profile_image: this.profileImageBase64
      };
      console.log('Update payload:', formData);
      if (this.isEditMode) {
        const ownerId = this.petSectionService.getOwnerId();
        if (ownerId) {
          this.petSectionService.updateOwner(ownerId, formData).subscribe(
            (response: any) => {
              this.toastr.success('Pet owner profile updated successfully.', 'Success', { timeOut: 3000 });
            },
            (error: any) => {
              this.toastr.error('Failed to update pet owner profile. Please check your input.', 'Error', { timeOut: 3000 });
              console.error('Error updating pet owner:', error);
            }
          );
        }
      } else {
        this.petSectionService.addPetOwner(formData).subscribe(
          (response: any) => {
            this.toastr.success('Pet owner profile created successfully.', 'Success', { timeOut: 3000 });
            this.resetForm();
          },
          (error: any) => {
            this.toastr.error('Failed to create pet owner profile. Please check your input.', 'Error', { timeOut: 3000 });
            console.error('Error adding pet owner:', error);
          }
        );
      }
    } else {
      Object.keys(this.ownerForm.controls).forEach(key => {
        const control = this.ownerForm.get(key);
        if (control && control.invalid) {
          console.log(`Field '${key}' is invalid. Errors:`, control.errors);
        }
      });
      this.toastr.warning('Please fill in all required fields.', 'Warning', { timeOut: 3000 });
    }
  }

  navigateToAddPet(): void {
    const ownerId = this.petSectionService.getOwnerId();
    if (ownerId) {
      this.router.navigate(['/add-pet']);
    } else {
      console.error("Owner ID not found. Setting from previous data.");
      const state = history.state.ownerData;
      if (state && state.id) {
        this.petSectionService.setOwnerId(state.id);
        this.router.navigate(['/add-pet']);
      } else {
        console.error("No owner data available.");
      }
    }
  }

  // Called when an individual pet's checkbox is toggled.
  onPetSelectionChange(pet: any, event: any): void {
    if (event.target.checked) {
      if (!this.selectedPets.some((selected) => selected.id === pet.id)) {
        this.selectedPets.push(pet);
      }
    } else {
      this.selectedPets = this.selectedPets.filter((selected: any) => selected.id !== pet.id);
    }
  }
  
  
  

  // Optional: Toggle select/deselect all pets.
  toggleSelectAll(event: any): void {
    const checked = event.target.checked;
    if (checked) {
      this.selectedPets = [...this.ownerData.pets];
    } else {
      this.selectedPets = [];
    }
    console.log('All selected:', this.selectedPets);
  }

  // When Print Info is clicked, check selected pets and send info.
  printInfo(): void {
  if (this.selectedPets.length === 0) {
    console.error('No pets selected.');
    return;
  }

  const owner = this.ownerData || {};
  
  const formattedPets = this.selectedPets.map(pet => ({
    name: pet.name,
    membership: {
      // Use pay_type for package name instead of package.title
      pay_type: pet.membership?.pay_type || 'N/A',
      price: pet.membership?.price || 0,
      start_date: pet.membership?.start_date,
      end_date: pet.membership?.end_date,
      status: pet.membership?.status,
      period: pet.membership?.period,
    }
  }));
  

  const invoiceData = {
    selectedPets: formattedPets,
    mode: 'pet',
    ownerData: {
      ownerName: `${this.ownerForm.value.first_name} ${this.ownerForm.value.last_name}`,
      city: this.ownerForm.value.city,
      location: this.ownerForm.value.address || '',
      contactNumber: this.ownerForm.value.phone,
      email: this.ownerForm.value.email,
    }
  };

  console.log('Invoice data:', invoiceData);

  this.router.navigate(['/invoice'], { state: invoiceData });
}

  
  
  
navigateToOrderInfo(orderId: number): void {
  this.router.navigate(['/order-info', orderId]);
}



// New function for printing the card
printCard(): void {
  if (this.selectedPets.length === 0) {
    this.toastr.error('Please select at least one pet to print a card.');
    return;
  }

  // Ensure all selected pets have memberships
  const invalidPets = this.selectedPets.filter(pet => !pet.membership);
  if (invalidPets.length > 0) {
    this.toastr.error('Only pets with active memberships can print cards.');
    return;
  }

  // Save the original page content
  const backupContent = document.body.innerHTML;
  let cardsHtml = '';

  this.selectedPets.forEach((pet, index) => {
    cardsHtml += `
    <div style="width: 3.375in; height: 2.125in; background-color: white; border: 1px solid black; border-radius: 5px; box-shadow: 0 0 5px rgba(0, 0, 0, 0.2); font-family: 'Promo Medium', sans-serif; padding: 10px; position: relative; display: flex; flex-direction: column; align-items: center; justify-content: space-between;">
        <div class="card">
            <div class="logo" style="position: absolute; top: 5px; right: 10px;">
                <img src="Image/newLogo.png" alt="Logo" style="max-height: 20px;" />
            </div>
            <!-- Info Section -->
            <div class="info-section" style="display: flex; align-items: center; width: 100%;">
                <!-- Image inside info section -->
                <div class="image-section" style="width: 30%; padding: 5px;">
                    <img src="Image/cat.png" alt="Pet Image" style="width: 100%; height: auto; border-radius: 8px; border: 2px solid purple;" />
                </div>

                <!-- Info details -->
                <div class="details-section" style="width: 70%; font-size: 10px; line-height: 1.4;">
                    <p><strong>BREED:</strong> ${pet.breed || '-'}</p>
                    <p><strong>COUNTRY:</strong> ${this.ownerData?.nationality || '-'}</p>
                    <p><strong>GENDER:</strong> ${pet.gender || '-'}</p>
                    <p><strong>VALID DATE:</strong> ${pet.membership?.end_date ? new Date(pet.membership.end_date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : '-'}</p>
                    <p><strong>PET OWNER:</strong> ${this.ownerData?.ownerName || (this.ownerData?.first_name + ' ' + this.ownerData?.last_name)}</p>
                </div>
            </div>

            <!-- Name and code -->
            <div class="additional-info" style="display: flex; justify-content: space-between; align-items: center; width: 100%; padding: 5px;">
                <div class="info-text">
                    <p style="font-weight: bold;">${pet.name || '-'}</p>
                    <p>SA001</p>
                </div>
                <div class="qr-container" style="width: 20px; height: 20px; border: 1px solid black;"></div>
            </div>
        </div>
    </div>
    ${index !== this.selectedPets.length - 1 ? '<div style="page-break-after: always;"></div>' : ''}
    `;
  });

  // Temporarily replace body for print
  document.body.innerHTML = cardsHtml;

  window.print();

  setTimeout(() => {
    document.body.innerHTML = backupContent;
    location.reload();
  }, 100);
}













printContent(type: string) {
  let printContent: HTMLElement | null;
  
  if (type === 'invoice') {
    printContent = document.getElementById('invoiceContent');
  } else if (type === 'card') {
    printContent = document.getElementById('cardContent');
  } else {
    console.error('Unknown content type');
    return;
  }

  if (!printContent) return;

  // Clone the element and force it to display
  const printContentClone = printContent.cloneNode(true) as HTMLElement;
  printContentClone.style.display = 'block';

  const originalBody = document.body.innerHTML;
  document.body.innerHTML = printContentClone.innerHTML;

  window.print();

  setTimeout(() => {
    document.body.innerHTML = originalBody;
    location.reload();
  }, 100);
}


get selectedPet() {
  return this.selectedPets.length > 0 ? this.selectedPets[0] : null;
}

  

  resetForm(): void {
    this.ownerForm.reset();
    this.profileImageFile = null;
    this.profileImageBase64 = null;
    this.profileImageFileName = 'No file chosen';
  }
}
