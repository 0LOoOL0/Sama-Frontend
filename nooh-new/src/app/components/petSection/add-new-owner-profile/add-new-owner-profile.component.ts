import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { PetSectionService } from '../service/PetSectionServices';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-new-owner-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-new-owner-profile.component.html',
  styleUrls: ['./add-new-owner-profile.component.css']
})
export class AddNewOwnerProfileComponent implements OnInit {
  ownerForm: FormGroup;
  profileImageFile: File | null = null;
  profileImageFileName: string = 'No file chosen';
  profileImageBase64: string | null = null;
  isEditMode = false; // Flag to know if we're editing an existing owner

  constructor(
    private fb: FormBuilder,
    private petSectionService: PetSectionService,
    private toastr: ToastrService,
    private router: Router
  ) {
    // Initialize the reactive form
    this.ownerForm = this.fb.group({
      first_name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(31), Validators.pattern('^[A-Za-z]+$')]],
      last_name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(31), Validators.pattern('^[A-Za-z]+$')]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      gender: ['', Validators.required],  // Added gender field
      nationality: ['', Validators.required],
      location: ['', Validators.required],
      date_of_birth: ['', Validators.required],
      phone: ['', Validators.required],
      house: [''],
      city: ['', Validators.required],
      road: [''],
      block: [''],
      building_name: [''],
      apt_number: [''],
      floor: [''],
      company: [''],
      status: ['Non-active', Validators.required],  // This holds the final status string.
  isActive: [false]  // This is a temporary boolean control bound to the checkbox.
    });
  }

  ngOnInit(): void {
    // Use window.history.state like in your provider component
    const state = window.history.state;
    console.log('Owner edit state:', state);
    if (state && state.ownerData) {
      this.isEditMode = true;
      this.populateForm(state.ownerData);
      // Optionally store the ownerId if needed for updating later
      this.petSectionService.setOwnerId(state.ownerData.id);

      // Remove password validators in edit mode so it isn't required
    this.ownerForm.get('password')?.clearValidators();
    this.ownerForm.get('password')?.updateValueAndValidity();

      console.log('Owner data received:', state.ownerData); // for debugging

      // When the isActive checkbox changes, update the status field accordingly:
  this.ownerForm.get('isActive')?.valueChanges.subscribe((isActive: boolean) => {
    // For example, if checked means "Active" and unchecked means "Non-active":
    this.ownerForm.get('status')?.setValue(isActive ? 'Active' : 'Non-active');
  });

    }
  }

  // Populate the form fields with owner data
  populateForm(owner: any): void {
    // Adjust the property names based on what your API returns.
    // For example, if your owner object uses "contactNumber" but your form expects "phone", map accordingly.
    this.ownerForm.patchValue({
      first_name: owner.first_name || (owner.ownerName ? owner.ownerName.split(' ')[0] : ''),
      last_name: owner.last_name || (owner.ownerName ? owner.ownerName.split(' ')[1] : ''),
      email: owner.email,
      phone: owner.contactNumber || owner.phone,
      nationality: owner.nationality,
      gender: owner.gender,  // Populate gender
      location: owner.location,
      date_of_birth: owner.date_of_birth,
      city: owner.city,
      house: owner.house,
      road: owner.road,
      block: owner.block,
      building_name: owner.building_name,
      apt_number: owner.apt_number,
      floor: owner.floor,
      company: owner.company,
      status: owner.status,
    isActive: owner.status === 'Active'  // Set true if Active, false otherwise
    });
    // Set the profile image if available
    // Set up the image preview and file name based on the owner's image URL
  this.profileImageBase64 = owner.imageUrl;
  this.profileImageFileName = owner.imageUrl ? 'Existing Image' : 'No file chosen';
  }

  // Handle profile image selection and convert to Base64
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
          console.log('New image Base64:', this.profileImageBase64);  // Debug log
        }
      };
      reader.readAsDataURL(file);
    }
  }

  // Submit the form
  onSubmit(): void {
    if (this.ownerForm.valid) {
      const formData = {
        ...this.ownerForm.value,
        profile_image: this.profileImageBase64 // send Base64-encoded image
      };
      console.log('Update payload:', formData); // Debug log

      if (this.isEditMode) {
        // Update existing owner
        const ownerId = this.petSectionService.getOwnerId();
        if (ownerId) {
          this.petSectionService.updateOwner(ownerId, formData).subscribe(
            (response: any) => {
              this.toastr.success('Pet owner profile updated successfully.', 'Success', { timeOut: 3000 });
              // Optionally navigate away or further process the response
            },
            (error: any) => {
              this.toastr.error('Failed to update pet owner profile. Please check your input.', 'Error', { timeOut: 3000 });
              console.error('Error updating pet owner:', error);
            }
          );
        }
      } else {
        // Create new owner
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
      // Log invalid controls for debugging
      Object.keys(this.ownerForm.controls).forEach(key => {
        const control = this.ownerForm.get(key);
        if (control && control.invalid) {
          console.log(`Field '${key}' is invalid. Errors:`, control.errors);
        }
      });
      this.toastr.warning('Please fill in all required fields.', 'Warning', { timeOut: 3000 });
    }
  }

  // Reset the form
  resetForm(): void {
    this.ownerForm.reset();
    this.profileImageFile = null;
    this.profileImageBase64 = null;
    this.profileImageFileName = 'No file chosen';
  }
}
