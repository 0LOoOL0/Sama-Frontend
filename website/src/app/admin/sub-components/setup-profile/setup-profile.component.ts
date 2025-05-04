import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-setup-profile',
  standalone: true,
  templateUrl: './setup-profile.component.html',
  styleUrls: ['./setup-profile.component.scss']
})
export class SetupProfileComponent implements AfterViewInit {
  profile = {
    name: '',
    phoneNumber: '',
    location: {
      house: '',
      road: '',
      block: '',
      area: ''
    },
    nationality: '',
    birthdate: ''
  };

  ngAfterViewInit(): void {
    const locationButtons = document.querySelectorAll('.location-btn');
    const locationInput = document.getElementById('location-type') as HTMLInputElement;

    locationButtons.forEach(button => {
      button.addEventListener('click', () => {
        locationButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        if (locationInput) {
          locationInput.value = (button as HTMLButtonElement).dataset['location'] || '';
        }
      });
    });
  }

  onSubmit(form: any): void {
    if (form.valid) {
      console.log(this.profile);
    } else {
      console.log('Form is not valid');
    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const reader = new FileReader();

    reader.onload = () => {
      const dataURL = reader.result as string;
      const previewImage = document.getElementById('previewImage') as HTMLImageElement;
      if (previewImage) {
        previewImage.src = dataURL;
      }
    };

    if (input.files && input.files[0]) {
      reader.readAsDataURL(input.files[0]);
    }
  }

  submitProfile(): void {
    // Implement profile submission logic here
  }
}
