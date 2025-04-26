import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-adv',
  templateUrl: './adv.page.html',
  styleUrls: ['./adv.page.scss'],
})
export class AdvPage implements OnInit {
  currentIndex = 0;
  cards = [
    {
      img: 'assets/pic circle1.png',
      title: 'Welcome to Sama Pet Care',
      content:
        'Your one app for all your pets! Dive into Sama Pet and start enjoying discounts on pet services, exploring adoption options, and tracking your pet’s well-being effortlessly!',
    },
    {
      img: 'assets/pic circle2.png',
      title: 'Become a member and enjoy exclusive discounts!',
      content:
        'As a member you will gain access to exclusive discounts on all services and products such as health, grooming, food, accessories and more!',
    },
    {
      img: 'assets/pic circle3.svg',
      title: 'Don’t miss out!',
      content: 'Take a few minutes to register to begin exploring the app!',
    },
  ];

  constructor(public translate: TranslateService) {}

  ngOnInit() {

    const storedLang = localStorage.getItem('selectedLanguage');
    if (storedLang) {
      this.translate.use(storedLang);
    } else {
      this.translate.setDefaultLang('en'); // Set a default language if none is stored
      this.translate.use('en'); // Optionally, set to the default language
    }

  }

  nextSlide() {
    if (this.currentIndex < this.cards.length - 1) {
      this.currentIndex++;
    }
  }

  prevSlide() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
  }
}
