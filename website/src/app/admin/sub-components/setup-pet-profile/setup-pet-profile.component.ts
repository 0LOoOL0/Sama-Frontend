import { Component } from '@angular/core';

@Component({
  selector: 'app-setup-pet-profile',
  standalone: true,
  imports: [],
  templateUrl: './setup-pet-profile.component.html',
  styleUrl: './setup-pet-profile.component.scss'
})
export class SetupPetProfileComponent {
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
}
