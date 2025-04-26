import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NavbarComponent } from '../navbar/navbar.component';
@Component({
  selector: 'app-lost-pet-profile',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './lost-pet-profile.component.html',
  styleUrls: ['./lost-pet-profile.component.css']
})
export class LostPetProfileComponent {
  // Form group for the lost pet profile form
  lostPetForm: FormGroup;

  constructor() {
    // Initializing form group with form controls and validators
    this.lostPetForm = new FormGroup({
      petImage: new FormControl(null),
      petName: new FormControl('', Validators.required),
      petType: new FormControl('', Validators.required),
      gender: new FormControl('', Validators.required),
      contactNumber: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')]),
      bio: new FormControl('', Validators.maxLength(500))
    });
  }

  // Method to handle form submission
  onSubmit(): void {
    if (this.lostPetForm.valid) {
      console.log('Form Submitted', this.lostPetForm.value);
    } else {
      console.error('Form is invalid');
    }
  }

  // Method to reset the form
  onCancel(): void {
    this.lostPetForm.reset();
  }
}
