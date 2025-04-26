import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-bookingdetaill',
  templateUrl: './bookingdetaill.page.html',
  styleUrls: ['./bookingdetaill.page.scss'],
})
export class BookingdetaillPage implements OnInit {
  booking: any;

  constructor(private router: Router, private alertController: AlertController) {
    const navigation = this.router.getCurrentNavigation();
    this.booking = navigation?.extras.state ? navigation.extras.state['booking'] : null;
  }

  ngOnInit() { }

  async cancelAppointment() {
    const alert = await this.alertController.create({
      cssClass: 'success-popup',
      header: 'Booking Canceled',
      message: 'Morbi porttitor eros blandit, imperdiet lectus et, malesuada odio.',
      buttons: ['OK']
    });

    await alert.present();
  }
}
