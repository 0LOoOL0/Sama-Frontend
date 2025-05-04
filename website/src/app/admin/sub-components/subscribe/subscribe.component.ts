import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-subscribe',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './subscribe.component.html',
  styleUrls: ['./subscribe.component.scss']
})
export class SubscribeComponent {
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
