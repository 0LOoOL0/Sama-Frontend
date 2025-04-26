import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-support',
  templateUrl: './support.page.html',
  styleUrls: ['./support.page.scss'],
})
export class SupportPage implements OnInit {
  constructor(private navCtrl: NavController) {}

  navigateTo(page: string) {
    this.navCtrl.navigateForward(`/${page}`);
  }

  contactViaWhatsApp() {
    window.open('https://wa.me/yourwhatsapplink', '_blank');
  }

  contactUs() {
    window.location.href = 'tel:+1234567890';
  }

  ngOnInit() {}
}
