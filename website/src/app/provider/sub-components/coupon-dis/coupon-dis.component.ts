import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-coupon-dis',
  standalone: true,
  imports: [],
  templateUrl: './coupon-dis.component.html',
  styleUrl: './coupon-dis.component.scss'
})
export class CouponDisComponent {

  constructor(private router:Router){

  }

  nextPage(){
    this.router.navigate(['/provider-main/coupon-discount']);
  }
}
