import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  FormArray,
} from '@angular/forms';
import { PetOwnerService } from '../service/petSection.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-new-owner-profile',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './add-new-owner-profile.component.html',
  styleUrl: './add-new-owner-profile.component.css'
})
export class AddNewOwnerProfileComponent {
  profileForm: FormGroup;
  // isSidebarVisible = true;
  // isFillVisible = false;
  imagePreview: string | null = null; 
  selectedPetOwner: any = {};
  ownerId: any;
  hasProfileData: boolean = false;

  constructor(
    private fb: FormBuilder,
    private profileService: PetOwnerService,
    private toastr: ToastrService
  ) {
    this.profileForm = this.fb.group({
      // authorizedPerson: this.fb.array([this.createAuthorizedPerson()]),

      toggle: [false],
      ownerName: [''],
      phoneNumber: [''],
      email: [''],
      nationality: [''],
      gender: [''],
      idNo: [''],
      address: this.fb.group({
        office: [''],
        road: [''],
        block: [''],
        city: [''],
      }),
    });
  }

  ngOnInit(): void {
    const navigation = history.state;
  
    if (navigation && navigation.petOwner) {
      this.selectedPetOwner = navigation.petOwner;
      this.populateForm(this.selectedPetOwner);
    } else {
      console.warn("No pet owner data received from navigation.");
    }
  }
  

populateForm(petOwner: any): void{
  this.hasProfileData = true;
  
  this.profileForm.patchValue({
    
    ownerName: petOwner?.name,
    phoneNumber: petOwner?.phone,
    email: petOwner?.email,
    nationality: petOwner?.nationality,
    gender: petOwner?.gender,
    idNo: petOwner?.id || petOwner?.pet_owner_id,
    address: {
      office: petOwner?.address?.office || petOwner?.office || '',
      road: petOwner?.address?.road || petOwner?.road || '',
      block: petOwner?.address?.block || petOwner?.block || '',
      city: petOwner?.address?.city || petOwner?.city || '',
    },
  });
  console.log(this.profileForm.value);
}
}

