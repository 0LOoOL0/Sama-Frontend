import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-adptionform',
  templateUrl: './adptionform.page.html',
  styleUrls: ['./adptionform.page.scss'],
})
export class AdptionformPage implements OnInit {
  pet = {
    name: '',
    type: '',
    breed: '',
    gender: 'Male',
    birthday: '',
    weight: '',
    height: '',
    color: '',
    vaccinated: false,
    microchipped: false,
    neutered: false,
    bio: '',
    image: 'assets/R.jpeg'
  };

  showDatePicker = false;
  age: number | null = null;

  constructor(private alertController: AlertController , private route: ActivatedRoute) {}
  role!: string;
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.role = params['role'];
      console.log('Role:', this.role);
    });
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
      message: `
        <div class="popup-content">
          <img src="${this.pet.image}" alt="Pet Image" class="popup-image"/>
          <p>Morbi porttitor eros blandit, imperdiet lectus et, malesuada odio.</p>
        </div>
      `,
      buttons: ['OK']
    });

    await alert.present();
  }
}
