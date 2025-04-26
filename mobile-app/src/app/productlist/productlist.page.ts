import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-productlist',
  templateUrl: './productlist.page.html',
  styleUrls: ['./productlist.page.scss'],
})
export class ProductlistPage implements OnInit {

  products = [
    { name: 'Product Name', price: 'Price', imageUrl: 'assets/pet.jpg' },
    { name: 'Product Name', price: 'Price', imageUrl: 'assets/pet.jpg' }
  ];

  constructor() { }

  ngOnInit() { }

  addProduct() {
    this.products.push({ name: 'Product Name', price: 'Price', imageUrl: 'assets/pet.jpg' });
  }

  continue() {
    // Implement the continue functionality here
  }

}
