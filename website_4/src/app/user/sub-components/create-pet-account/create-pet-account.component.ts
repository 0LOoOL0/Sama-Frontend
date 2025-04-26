import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { PetinfoService } from '../../../services/petinfo.service';
import {
  AllBreeds,
  Breed,
  PetType,
  allBreeds,
  petType,
} from '../../../shared/Pet';
import { CommonModule } from '@angular/common';
import { UserAuthService } from '../../../services/user-auth.service';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-create-pet-account',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NavbarComponent],
  templateUrl: './create-pet-account.component.html',
  styleUrls: ['./create-pet-account.component.css']
})
export class CreatePetAccountComponent implements OnInit {
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  selectedImage: string | ArrayBuffer | null = null;
  selectedImageFile: File | null = null;
  petTypes: PetType[] = petType;
  allBreeds: AllBreeds = allBreeds;
  filteredBreeds: Breed[] = [];
  petForm!: FormGroup;
  userProfile: any;
  petId: number | null = null; // To hold the pet ID if editing
  imageFile: File | null = null;
  back: boolean = false;

  constructor(
    private fb: FormBuilder,
    private petInfoService: PetinfoService,
    private router: Router,
    private route: ActivatedRoute, // Inject ActivatedRoute to access route parameters
    private auth: UserAuthService
  ) {}

  async ngOnInit() {
    this.initPetForm();
    this.setupValueChangeListeners();
    await this.prof();
    this.route.paramMap.subscribe(async params => {
      this.petId = Number(params.get('id')); // Get the pet ID from route parameters
      this.back = Boolean(params.get('back'));
      if (this.petId) {
        await this.loadPetData(this.petId); // Load pet data if editing
      }
    });
  }

  async prof() {
    this.userProfile = await this.auth.getProfile();
  }

  private initPetForm() {
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
  }

  private setupValueChangeListeners() {
    this.petForm.get('selectedPetType')?.valueChanges.subscribe(value => {
      const customPetTypeControl = this.petForm.get('customPetType');
      if (value === 'other') {
        customPetTypeControl?.setValidators([Validators.required]);
      } else {
        customPetTypeControl?.clearValidators();
      }
      customPetTypeControl?.updateValueAndValidity();
    });

    this.petForm.get('selectedBreed')?.valueChanges.subscribe(value => {
      const customBreedControl = this.petForm.get('customBreed');
      if (value === 'other') {
        customBreedControl?.setValidators([Validators.required]);
      } else {
        customBreedControl?.clearValidators();
      }
      customBreedControl?.updateValueAndValidity();
    });
  }

  private async loadPetData(petId: number) {
    try {
      const resp = await this.petInfoService.getPet(petId).toPromise();
      const petData = resp; // this method fetches pet data by ID
      this.petForm.patchValue({
        petName: petData.name,
        selectedPetType: petData.pet_type,
        selectedBreed: petData.breed,
        gender: petData.gender,
        age: petData.age,
        weight: petData.weight,
        height: petData.height,
        color: petData.color,
        vaccinated: petData.is_vaccinated,
        microchipped: petData.is_microchipped,
        neutered: petData.is_neutered,
      });
      console.log(this.petForm.value);
      this.selectedImage = petData.image; // Load existing image if available
    } catch (error) {
      console.error('Error loading pet data:', error);
    }
  }

  onPetTypeChange(event: Event): void {
    const selectedType = (event.target as HTMLSelectElement).value;
    this.filteredBreeds = selectedType in this.allBreeds
      ? this.allBreeds[selectedType as keyof AllBreeds]
      : this.allBreeds.other;
  }

  // Trigger the hidden file input dialog
  triggerFileInput(): void {
    this.fileInput.nativeElement.click();
  }

  // Simplified displayImage method:
  displayImage(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      // Create a preview URL for display
      const reader = new FileReader();
      reader.onload = (e) => {
        this.selectedImage = e.target?.result ?? null;
      };
      reader.readAsDataURL(file);
      // Directly use the original file for upload
      this.imageFile = file;
    } else {
      console.error('No files selected or input is null');
    }
  }

  clearImage(): void {
    this.selectedImage = null;
    this.selectedImageFile = null;
    localStorage.removeItem('petImageFile');
    localStorage.removeItem('petImageFileBase64');
  }

  async savePetProfile(): Promise<void> {
    console.log('savePetProfile() triggered.');
    if (this.petForm.valid) {
      const petProfile: FormData = this.createPetProfile();
      console.log('Pet profile being submitted:', petProfile);

      // Check that userProfile is loaded
      if (!this.userProfile || !this.userProfile.id) {
        console.error('User profile is missing or invalid:', this.userProfile);
        return;
      }

      try {
        let resp: any;
        if (this.petId) {
          console.log('Updating existing pet with ID:', this.petId);
          resp = await this.petInfoService.updatePet(this.petId, petProfile);
        } else {
          console.log('Creating new pet...');
          resp = await this.petInfoService.addPet(petProfile);
        }
        console.log('API response received:', resp);

        // Determine petId from the response. This assumes that the response object contains a pet property with an id.
        const currentPetId = this.petId ? this.petId : resp.pet.id;
        // Optionally, store it in localStorage if needed later:
        localStorage.setItem('currentPetId', currentPetId.toString());

        // Now, navigate to the document upload page with the pet id as a route parameter
        console.log('Navigation to document-upload triggered with pet id:', currentPetId);
        this.router.navigate(['user-main-component/document-upload', currentPetId]);
      } catch (error: any) {
        console.error('Error occurred during pet submission:', error);
      }
    } else {
      console.error('Form is invalid. Current form value:', this.petForm.value);
    }
  }

  private createPetProfile(): FormData {
    const formData = new FormData();
    formData.append('name', this.petForm.value.petName);
    formData.append('gender', this.petForm.value.gender);
    formData.append('age', this.petForm.value.age);
    formData.append('weight', this.petForm.value.weight);
    formData.append('height', this.petForm.value.height);
    formData.append('color', this.petForm.value.color);
    formData.append('is_vaccinated', this.petForm.value.vaccinated);
    formData.append('is_microchipped', this.petForm.value.microchipped);
    formData.append('is_neutered', this.petForm.value.neutered);
    formData.append(
      'pet_type',
      this.petForm.value.selectedPetType === 'other'
        ? this.petForm.value.customPetType
        : this.petForm.value.selectedPetType
    );
    formData.append(
      'breed',
      this.petForm.value.selectedBreed === 'other'
        ? this.petForm.value.customBreed
        : this.petForm.value.selectedBreed
    );
    formData.append('pet_owner_id', this.userProfile.id);
    if (this.imageFile) {
      formData.append('image', this.imageFile);
    }
    return formData;
  }

  navigateDocument() {
    this.router.navigate(['user-main-component/document-upload']);
  }

  skip() {
    this.router.navigate(['user-main-component/new-user-profile']);

  }
}
