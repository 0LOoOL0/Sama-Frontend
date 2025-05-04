import { Component, OnInit } from '@angular/core';
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
  imports: [CommonModule, ReactiveFormsModule,NavbarComponent],
  templateUrl: './create-pet-account.component.html',
  styleUrls: ['./create-pet-account.component.css']
})
export class CreatePetAccountComponent implements OnInit {
  selectedImage: string | ArrayBuffer | null = null;
  selectedImageFile: File | null = null;
  petTypes: PetType[] = petType;
  allBreeds: AllBreeds = allBreeds;
  filteredBreeds: Breed[] = [];
  petForm!: FormGroup;
  userProfile: any;
  petId: number | null = null; // To hold the pet ID if editing
  imageFile: any;
  back: boolean = false;
  selectedService: string = '';

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
    this.prof();
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
      const petData =  resp; //this method fetches pet data by ID
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

  displayImage(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
        const file = input.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
            this.selectedImage = e.target?.result ?? null;
            this.selectedImageFile = file;
            localStorage.setItem('petImageFile', file.name);
            const fileReader = new FileReader();
            fileReader.onload = async () => {
                const base64String = fileReader.result!.toString().split(',')[1];
                localStorage.setItem('petImageFileBase64', base64String);

                const imageDataUrl = `data:image/jpeg;base64,${base64String}`;
                const imageBlob = await (await fetch(imageDataUrl)).blob();
                this.imageFile = new File([imageBlob], file.name, {
                type: imageBlob.type,
          });
            };
            fileReader.readAsDataURL(file);
        };
        reader.readAsDataURL(file);
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
    if (this.petForm.valid) {
      const petProfile = this.createPetProfile();
      console.log('Pet ====>', petProfile);

      try {
        if (this.petId) {
          console.log('petID=>', this.petId);
          // Update existing pet
          const resp = await this.petInfoService.updatePet(this.petId, petProfile); // Assume this method updates the pet
          if (resp !== undefined) {
            console.log('response', resp);
            if(this.back){this.router.navigate(['/user-main-component/choose-pet']);}
            this.router.navigate(['user-main-component/pet-info']);
          } else {
            throw console.error();
          }
        } else {
          // Add new pet
          const resp = await this.petInfoService.addPet(petProfile);
          if (resp !== undefined) {
            if(this.back){this.router.navigate(['/user-main-component/choose-pet']);}
            this.router.navigate(['user-main-component/pet-info']);
          } else {
            throw console.error();
          }
        }
      } catch (error: any) {
        console.error(error);
      }
    } else {
      console.error('Form is invalid');
    }
  }

  private createPetProfile() {
    return {
      name: this.petForm.value.petName,
      gender: this.petForm.value.gender,
      age: this.petForm.value.age,
      weight: this.petForm.value.weight,
      height: this.petForm.value.height,
      color: this.petForm.value.color,
      is_vaccinated: this.petForm.value.vaccinated,
      is_microchipped: this.petForm.value.microchipped,
      is_neutered: this.petForm.value.neutered,
      pet_type: this.petForm.value.selectedPetType === 'other'
        ? this.petForm.value.customPetType
        : this.petForm.value.selectedPetType,
      breed: this.petForm.value.selectedBreed === 'other'
        ? this.petForm.value.customBreed
        : this.petForm.value.selectedBreed,      
      pet_owner_id: this.userProfile.id,
      image: this.imageFile
    };
  }

  skip() {
    this.router.navigate(['user-main-component/my-profile']);
  }

  goToForm() {
    this.router.navigate(['user-main-component/pet-servicce-form']);
  }

  selectService(service: string) {
    this.selectedService = service;
  }
}