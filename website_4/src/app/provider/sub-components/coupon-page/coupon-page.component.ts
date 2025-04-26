import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { addIcons } from "ionicons";

interface Coupon {
  createdDate: string;
  expiredDate: string;
  logo: string;
  providerName: string;
  description: string;
  quantity: number;
  contact: string;
  membership: string;
}
@Component({
  selector: 'app-coupon-page',
  standalone: true,
  imports: [     FormsModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,   // Import MatCardModule here
    MatFormFieldModule,
    MatInputModule ],
  templateUrl: './coupon-page.component.html',
  styleUrl: './coupon-page.component.scss'
})
export class CouponPageComponent {
  dateFrom: string = '';
  dateTo: string = '';
  providerName: string = '';
  searchTerm: string = '';

  coupons: Coupon[] = [
    {
      createdDate: '2023-01-01',
      expiredDate: '2023-12-31',
      logo: 'assets/provider-a-logo.png',
      providerName: 'Provider A',
      description: 'Description of the coupon',
      quantity: 100,
      contact: 'contact@provider.com',
      membership: 'Yes'
    },
    {
      createdDate: '2023-02-01',
      expiredDate: '2023-11-30',
      logo: 'assets/provider-b-logo.png',
      providerName: 'Provider B',
      description: 'Another coupon description',
      quantity: 50,
      contact: 'info@providerb.com',
      membership: 'No'
    }
  ];

  displayedColumns: string[] = ['createdDate', 'expiredDate', 'logo', 'providerName', 'description', 'quantity', 'contact', 'membership', 'actions'];

  addCoupon() {
    // Logic for adding coupon
  }

  editCoupon(id: number) {
    // Logic for editing coupon
  }

  deleteCoupon(id: number) {
    // Logic for deleting coupon
  }
}