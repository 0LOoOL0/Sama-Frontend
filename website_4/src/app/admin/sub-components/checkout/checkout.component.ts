import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { IonButton } from '@ionic/angular/standalone';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [
    IonButton,
    MatCardModule,
    MatFormFieldModule,
    CommonModule,
    MatListModule,
    MatIconModule,
  ],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss',
})
export class CheckoutComponent {
  list = [
    {
      house: 'House 1',
      province: 'Province 1',
      city: 'City 1',
      block: 'Block 1',
    },
    {
      house: 'House 2',
      province: 'Province 2',
      city: 'City 2',
      block: 'Block 2',
    },
  ];

  editAddress() {}

  addAddress() {}

  applyCoupon() {}
}
