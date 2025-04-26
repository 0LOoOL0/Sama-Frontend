import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-ad-promo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ad-promo.component.html',
  styleUrl: './ad-promo.component.scss'
})
export class AdPromoComponent {
  popupVisible = false;

  showPopup() {
    console.log('Popup opened');
    this.popupVisible = true;
  }

  hidePopup() {
    console.log('Popup closed');
    this.popupVisible = false;
  }

  stopPropagation(event: Event) {
    event.stopPropagation();
  }
}
