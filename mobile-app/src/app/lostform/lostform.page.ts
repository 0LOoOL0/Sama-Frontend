import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { PetInfoService } from '../services/pet-info.service';
import axios from 'axios';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-lostform',
  templateUrl: './lostform.page.html',
  styleUrls: ['./lostform.page.scss'],
})
export class LostformPage implements OnInit {
  lostPetForm: FormGroup;
  petImagePreview: string | ArrayBuffer | null = null;
  selectedFile: File | null = null;
  petTypes = [
    { value: 'Dog', display: 'Dog' },
    { value: 'Cat', display: 'Cat' },
    { value: 'Bird', display: 'Bird' },
    { value: 'Rabbit', display: 'Rabbit' },
    { value: 'Hamster', display: 'Hamster' },
    { value: 'Fish', display: 'Fish' },
  ];

  constructor(
    private alertController: AlertController,
    private authService: AuthService,
    private petInfoService: PetInfoService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.lostPetForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(32)]],
      pet_type: ['', Validators.required],
      breed: ['', Validators.required],
      color: ['', Validators.required],
      gender: ['', Validators.required],
      description: ['',Validators.required, Validators.maxLength(255)],
      location: ['', Validators.required],
      role: ['', Validators.required],
    });
  }

  ngOnInit() {}

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = () => {
        this.petImagePreview = reader.result;
        this.lostPetForm.updateValueAndValidity();
    };
    reader.readAsDataURL(file);
  }
}
  

async submitForm() {
  console.log('Form data before submission:', this.lostPetForm.value);
  if (this.lostPetForm.invalid) {
    return;
  }

  try {
    // Get the logged-in user's ID
    const profile = await this.authService.fetchProfileData();
    const petOwnerId = profile.id;

    // Prepare form data
    const formData = new FormData();
    Object.keys(this.lostPetForm.controls).forEach(key => {
      formData.append(key, this.lostPetForm.get(key)?.value);
    });

    // Append the pet owner's ID
    formData.append('pet_owner_id', petOwnerId);

    // Append the image file if it exists
    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }

    // Log the form data for debugging
    formData.forEach((value, key) => {
      console.log(`${key}: ${value}`);
    });
    
    // Call the service to add the lost pet
    const response = await this.petInfoService.addLostPetByFounder(formData);
    console.log('Lost pet added successfully:', response);

    // Show success alert
    const alert = await this.alertController.create({
      cssClass: 'success-popup',
      header: 'Posted successfully',
      message: 'The lost pet has been reported successfully.',
      buttons: ['OK']
    });
    await alert.present();

    // Navigate to adoption list after success
    this.router.navigate(['/adoptionlist']);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 422) {
        console.error('Validation errors:', error.response.data.errors);
      } else {
        console.error('Axios error details:', error.toJSON());
      }
    } else {
      console.error('General error:', error);
    }      
  }
}

  
}
