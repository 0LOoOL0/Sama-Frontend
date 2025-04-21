import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'sama-orders',
  templateUrl: './sama-orders.component.html',
  styleUrls: ['./sama-orders.component.css']
})
export class SamaOrdersComponent {
  constructor(
    private router: Router,
  ) { }  
  orderDetails() {
    this.router.navigate(['/order-info']);
  }

  customerOrders() {
    this.router.navigate(['/owner-profile/1']);
  }

 }