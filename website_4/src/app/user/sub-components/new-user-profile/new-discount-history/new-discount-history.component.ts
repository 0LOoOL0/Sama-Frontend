import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { PetinfoService, Pet } from '../../../../services/petinfo.service';
import { UserAuthService } from '../../../../services/user-auth.service';
import { RouterModule, Routes } from '@angular/router';

@Component({
  selector: 'app-new-discount-history',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './new-discount-history.component.html',
  styleUrl: './new-discount-history.component.css'
})
export class NewDiscountHistoryComponent {

  constructor(
    private router: Router,
    private userAuthService: UserAuthService,
    private petInfoService: PetinfoService
  ) { }

  //testing for database later
  discountHistory = [
    {
      date: '18/08/2024 18:38:58',
      id: '15879314569',
      service: 'Cat Grooming Services',
      image: 'assets/cat-grooming.jpg',
      originalPrice: 7.000,
      savedAmount: 3.000,
      finalPrice: 4.000,
      items: 3
    },
    {
      date: '15/07/2024 14:22:31',
      id: '15879314570',
      service: 'Cat Grooming Services',
      image: 'assets/cat-grooming.jpg',
      originalPrice: 7.000,
      savedAmount: 3.000,
      finalPrice: 4.000,
      items: 3
    },
    {
      date: '02/06/2024 09:15:47',
      id: '15879314571',
      service: 'Cat Grooming Services',
      image: 'assets/cat-grooming.jpg',
      originalPrice: 7.000,
      savedAmount: 3.000,
      finalPrice: 4.000,
      items: 3
    }
  ];

  navigateToDetails() {
    this.router.navigate(['/user-main-component/new-user-profile/new-discount-details']);
  }
}
