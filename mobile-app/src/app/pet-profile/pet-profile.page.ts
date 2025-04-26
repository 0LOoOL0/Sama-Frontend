import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  AllBreeds,
  Breed,
  PetType,
  allBreeds,
  petType,
} from 'src/utilities/Pet';
import { PetInfoService } from '../services/pet-info.service';

@Component({
  selector: 'app-pet-profile',
  templateUrl: './pet-profile.page.html',
  styleUrls: ['./pet-profile.page.scss'],
})
export class PetProfilePage implements OnInit {
  selectedImage: string | ArrayBuffer | null = null;
  selectedImageFile: File | null = null; // Add this line
  petTypes: PetType[] = petType;
  allBreeds: AllBreeds = allBreeds;

  filteredBreeds: Breed[] = [];
  petForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private petInfoService: PetInfoService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.petForm = this.fb.group({
      petName: ['', Validators.required],
      selectedPetType: ['', Validators.required],
      customPetType: [''],
      selectedBreed: ['', Validators.required],
      customBreed: [''],
      gender: ['', Validators.required],
      age: ['', Validators.required],
      weight: ['', [Validators.required, Validators.min(0)]],
      height: ['', [Validators.required, Validators.min(0)]],
      color: ['', Validators.required],
      vaccinated: ['', Validators.required],
      microchipped: ['', Validators.required],
      neutered: ['', Validators.required],
    });

    this.petForm.get('selectedPetType')?.valueChanges.subscribe(value => {
      if (value === 'other') {
        this.petForm.get('customPetType')?.setValidators([Validators.required]);
      } else {
        this.petForm.get('customPetType')?.clearValidators();
      }
      this.petForm.get('customPetType')?.updateValueAndValidity();
    });

    this.petForm.get('selectedBreed')?.valueChanges.subscribe(value => {
      if (value === 'other') {
        this.petForm.get('customBreed')?.setValidators([Validators.required]);
      } else {
        this.petForm.get('customBreed')?.clearValidators();
      }
      this.petForm.get('customBreed')?.updateValueAndValidity();
    });
  }

  onPetTypeChange(event: CustomEvent): void {
    const selectedType = event.detail.value;
    if (selectedType in this.allBreeds) {
      this.filteredBreeds = this.allBreeds[selectedType as keyof AllBreeds];
    } else {
      this.filteredBreeds = this.allBreeds.other;
    }
  }

  displayImage(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = e => {
        this.selectedImage = e.target?.result ?? null;
        this.selectedImageFile = input.files![0]; // Add this line
        localStorage.setItem('petImageFile', input.files![0].name); // Add this line
        const fileReader = new FileReader();
        fileReader.onload = () => {
          const base64String = fileReader.result?.toString().split(',')[1];
          localStorage.setItem('petImageFileBase64', base64String ?? '');
        };
        fileReader.readAsDataURL(input.files![0]);
      };
      reader.readAsDataURL(input.files[0]);
    }
  }

  clearImage(): void {
    this.selectedImage = null;
    this.selectedImageFile = null;
    localStorage.removeItem('petImageFile');
    localStorage.removeItem('petImageFileBase64');
  }

  async savePetProfile(): Promise<void> {
    if (this.petForm.valid) {
      const petProfile = {
        petName: this.petForm.value.petName,
        gender: this.petForm.value.gender,
        age: this.petForm.value.age,
        weight: this.petForm.value.weight,
        height: this.petForm.value.height,
        color: this.petForm.value.color,
        vaccinated: this.petForm.value.vaccinated,
        microchipped: this.petForm.value.microchipped,
        neutered: this.petForm.value.neutered,
        petType:
          this.petForm.value.selectedPetType === 'other'
            ? this.petForm.value.customPetType
            : this.petForm.value.selectedPetType,
        breed:
          this.petForm.value.selectedBreed === 'other'
            ? this.petForm.value.customBreed
            : this.petForm.value.selectedBreed,
            is_lost: false, // Set according to your needs
            documents: JSON.stringify({}), // Add relevant documents if needed
            allow_adoption: false, // Set according to your needs
      };

      console.log('Pet ====>', petProfile);

      try {
        localStorage.setItem('pet Info', JSON.stringify(petProfile));
        this.router.navigate(['/add-pet-doc']);
      } catch (error: any) {
        console.error(error.response.data);
      }

      // this.petInfoService.addPetProfile(petProfile).subscribe(
      //   (response: any) => {
      //     console.log('Pet profile saved successfully:', response);
      //     // Navigate to the next page or show a success message
      //   },
      //   (error: any) => {
      //     console.error('Error saving pet profile:', error);
      //     // Show an error message
      //   },
      // );
    } else {
      console.error('Form is invalid');
      return;
    }
  }
}
