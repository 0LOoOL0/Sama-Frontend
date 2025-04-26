import { Component } from '@angular/core';
import { FormGroup, Validators, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from '../navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { PetinfoService } from '../../../services/petinfo.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-lost-pet-form',
  standalone: true,
  imports: [NavbarComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './lost-pet-form.component.html',
  styleUrls: ['./lost-pet-form.component.css',
    './style.css', './resposiveness.css', './pet-form.css', './custom-style.css'
  ]
})
export class LostPetFormComponent {
  // Form group for the lost pet form
  lostPetForm!: FormGroup;
  selectedImage: string | ArrayBuffer | null = null;
  selectedImageFile: File | null = null;
  imageFile: any;

  constructor(private fb: FormBuilder, private petServ: PetinfoService, private router: Router) {
    // Initializing form group with form controls and validators
    this.lostPetForm = this.fb.group({
      petName: ['', Validators.required],
      petType: ['', Validators.required],
      petBreed: ['', Validators.required],
      color: ['', Validators.required],
      gender: [''],
      bio: ['', Validators.maxLength(500)]
    });
  }

  clearImage(): void {
    this.selectedImage = null;
    this.selectedImageFile = null;
    localStorage.removeItem('petImageFile');
    localStorage.removeItem('petImageFileBase64');
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

  // Method to handle form submission
  async onSubmit(){
    try{
      if (this.lostPetForm.valid) {
      const petProfile = this.createPetProfile();
      console.log(petProfile);
      const resp = await this.petServ.addLostByFounder(petProfile);
      if (resp) {
        console.log('response', resp);
        this.router.navigate(['/user-main-component/adoption-center']);
      } else {
        throw console.error();
      }
      } else {
        console.error('Form is invalid');
      }
    }catch(error){

    }
    
  }

  private createPetProfile() {
    return {
      name: this.lostPetForm.value.petName,
      gender: this.lostPetForm.value.gender,
      description: this.lostPetForm.value.bio,
      color: this.lostPetForm.value.color,
      pet_type: this.lostPetForm.value.petType,
      breed: this.lostPetForm.value.petBreed,
      role: 'Founder',
      image: this.imageFile,
      pet_owner_id: 1,
      location: '123123'
    };
  }

  // Method to reset the form
  onCancel(): void {
    this.lostPetForm.reset();
  }
}
