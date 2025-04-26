import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-selling-pet-form',
  templateUrl: './selling-pet-form.page.html',
  styleUrls: ['./selling-pet-form.page.scss'],
})
export class SellingPetFormPage implements OnInit {
  pet = {
    name: '',
    type: '',
    breed: '',
    price:'',
    gender: 'Male',
    birthday: '',
    weight: '',
    height: '',
    color: '',
    vaccinated: false,
    microchipped: false,
    neutered: false,
    bio: '',
mobileN:''
  };

  showDatePicker = false;
  age: number | null = null;

  constructor(private alertController: AlertController) {}

  ngOnInit() {
    // Implement any initialization logic here
  }

  toggleDatePicker() {
    this.showDatePicker = !this.showDatePicker;
  }

  calculateAge(birthday: string): number {
    const birthDate = new Date(birthday);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  onBirthdayChange(event: any) {
    const selectedDate = event.detail.value;
    this.age = this.calculateAge(selectedDate);
    this.pet.birthday = selectedDate;
  }

  async submitForm() {
    const alert = await this.alertController.create({
      cssClass: 'success-popup',
      header: 'Posted successfully',
      buttons: ['OK']
    });

    await alert.present();
  }
}
