import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { PetinfoService, Pet } from '../../../../services/petinfo.service';
import { UserAuthService } from '../../../../services/user-auth.service';

@Component({
  selector: 'app-new-discount-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './new-discount-details.component.html',
  styleUrl: './new-discount-details.component.css'
})
export class NewDiscountDetailsComponent {

  //dummy database details
  discountDetails = {
    date: '18/08/2024 18:38:58',
    id: '15879314569',
    service: 'Cat Grooming Services',
    image: 'assets/cat-grooming.jpg',
    originalPrice: 7.000,
    savedAmount: 3.000,
    finalPrice: 4.000,
    items: [
      { name: 'Bath & Brush', quantity: 1, price: 2.000 },
      { name: 'Nail Trim', quantity: 1, price: 1.000 },
      { name: 'Ear Cleaning', quantity: 1, price: 1.000 }
    ],
    provider: 'Happy Paws Pet Salon',
    location: 'Block 338, Road 3830, Manama'
  };

  constructor(
    private router: Router,
    private userAuthService: UserAuthService,
    private petInfoService: PetinfoService
  ) { }
  
  goBack() {
    this.router.navigate(['/user-main-component/new-user-profile/new-discount-history']);
  }
}
