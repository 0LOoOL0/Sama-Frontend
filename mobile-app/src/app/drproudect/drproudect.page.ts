import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
@Component({
  selector: 'app-drproudect',
  templateUrl: './drproudect.page.html',
  styleUrls: ['./drproudect.page.scss'],
})
export class DrproudectPage implements OnInit {
 
  
  isFavorite = false;

  reviews = [
    { name: 'Charlotte Hanlin', avatar: 'assets/avatar1.jpg', comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
    { name: 'Charlotte Hanlin', avatar: 'assets/avatar2.jpg', comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' }
 
  ];

  constructor(private toastController: ToastController) { }

  ngOnInit() {
  }

  async bookAppointment() {
   
    const toast = await this.toastController.create({
      message: 'Booking appointment...',
      duration: 2000,
      position: 'bottom'
    });
    await toast.present();
  }

  async shareService() {
 
    const toast = await this.toastController.create({
      message: 'Service shared!',
      duration: 2000,
      position: 'bottom'
    });
    await toast.present();
  }

  async toggleFavorite() {
    this.isFavorite = !this.isFavorite;
    const toast = await this.toastController.create({
      message: this.isFavorite ? 'Added to favorites!' : 'Removed from favorites!',
      duration: 2000,
      position: 'bottom'
    });
    await toast.present();
  }

}